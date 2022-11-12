import React from 'react';
import { ReactComponent as SendCommentSVG } from '../../assets/enviar.svg';
import style from './PhotoCommentsForm.module.css'
import useFetch from '../../hooks/useFetch';
import { COMMENT_POST } from '../../api';
import Error from '../../helpers/Error';

const PhotoCommentsForm = ({ id, setComments, single }) => {

    const { request, error } = useFetch();
    const [ comment, setComment ] = React.useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const token = window.localStorage.getItem('token');

        const { url, options } = COMMENT_POST(id, { comment }, token);
        const { apiRequest, apiResponse } = await request(url, options);

        if ( apiRequest.ok ) {
            setComment('');
            setComments(comments => [...comments, apiResponse]);
        }

    } 

    return (
        <form className={`${style.formComment} ${single ? style.single : ''}`} onSubmit={handleSubmit}>
            <label htmlFor="comment" className={style.labelComment}>Leave a Comment...</label>
            <div className={style.commentContainer}>
                <textarea 
                    id='comment'
                    name='comment'
                    className={style.commentTextArea}
                    value={comment} 
                    required
                    onChange={({target}) => setComment(target.value)} 
                />
                <button className={style.button}><SendCommentSVG /></button>
                <Error error={error} />
            </div>
        </form>
    );
}

export default PhotoCommentsForm;
