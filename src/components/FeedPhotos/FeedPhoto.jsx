import React from 'react';
import style from './FeedPhoto.module.css';
import ImageSkeleton from '../ImageSkeleton/ImageSkeleton';

const FeedPhoto = ({ photo, setModalPhoto }) => {

    const handleClick = () => setModalPhoto(photo)

    return (
        <li className={style.photo} onClick={handleClick}>
            <ImageSkeleton src={photo.src} alt={photo.title} />
            <span className={style.views}>{photo.acessos}</span>
        </li>
    );
}

export default FeedPhoto;
