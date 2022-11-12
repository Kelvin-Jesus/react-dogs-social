import React from 'react';
import { PHOTO_DELETE } from '../../api';
import Usefetch from '../../hooks/useFetch';
import style from './PhotoDelete.module.css';

const PhotoDelete = ({ photoId }) => {

    const { loading, request } = Usefetch();
    const userToken = window.localStorage.getItem('token');

    const handleClick = async e => {
        e.preventDefault()

        const shouldDeleteThePost = window.confirm("Do u have sure?");

        if ( shouldDeleteThePost === false ) return;

        const { url, options } = PHOTO_DELETE(photoId, userToken);
        const { apiRequest } = await request(url, options);

        if ( apiRequest.ok ) window.location.reload()
    }

    return (
        <>
            { loading ? (
                <button onClick={handleClick} className={style.delete} disabled>Delete</button>
            ) : (
                <button onClick={handleClick} className={style.delete}>Delete</button>
            ) }
        </>
    );
}

export default PhotoDelete;
