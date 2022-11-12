import React from 'react';
import { UserContext } from '../../contexts/UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import style from './PhotoComments.module.css';

const PhotoComments = (props) => {

    const { login } = React.useContext(UserContext);
    const [ comments, setComments ] = React.useState(() => props.comments);
    const commentSection = React.useRef(null);

    React.useEffect(() => {
        commentSection.current.scrollTop = commentSection.current.scrollHeight;
    }, [comments])

    return (
        <>
            <ul ref={commentSection} className={`${style.comment} ${props.single ? style.single : ''}`}>
                { comments.map(comment => (
                        <li key={comment.comment_ID}>
                            <b>{comment.comment_author}: </b>
                            <span>{comment.comment_content}</span>
                        </li>
                    ))
                }
            </ul>
            { login && <PhotoCommentsForm single={props.single} id={props.id} setComments={setComments} />}
        </>
    );
}

export default PhotoComments;
