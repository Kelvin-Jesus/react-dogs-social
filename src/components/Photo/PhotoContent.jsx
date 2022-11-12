import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import PhotoComments from './PhotoComments';
import PhotoDelete from './PhotoDelete';
import ImageSkeleton from '../ImageSkeleton/ImageSkeleton';

import style from './PhotoContent.module.css';
import Head from '../Head/Head';

const PhotoContent = ({ data, single }) => {

    const { photo, comments } = data;
    const user = React.useContext(UserContext);

    return (
        <div className={`${style.photo} ${single ? style.single : ''}`}>
            <Head title={`${photo && photo.author}'s photo`} description={`Photo from ${photo && photo.author}`} />
            <div className={style.img}>
                <ImageSkeleton src={photo.src} alt={photo.title} />
            </div>
            <div className={style.details}>
                <p className={style.author}>
                    {
                        user.data && user.data.username === photo.author 
                        ? <PhotoDelete photoId={photo.id} />
                        : <Link to={`/profile/${photo.author}`}>
                                @{photo.author}
                          </Link>
                    }
                    
                </p>
                <span className={style.views}>{photo.acessos}</span>
                <h1 className="title">
                    <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
                </h1>
                <ul className={style.attributes}>
                    <li>{photo.peso} KG</li>
                    <li>{photo.idade} {photo.idade == 1 ? 'ano' : 'anos'}</li>
                </ul>
            </div>
            <PhotoComments single={single} id={photo.id} comments={comments} />
        </div>
    );
}

export default PhotoContent;
