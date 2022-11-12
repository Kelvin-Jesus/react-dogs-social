import React from 'react';
import style from './ImageSkeleton.module.css'

const ImageSkeleton = ({ alt, ...props}) => {

    const [ skeleton, setSkeleton ] = React.useState(true);

    const handleLoad = ({ target }) => {
        setSkeleton(false);
        target.style.opacity = 1;
    }

    return (
        <div className={style.wrapper}>
            { skeleton ? <div className={style.skeleton}></div> : <></>}
            <img onLoad={handleLoad} className={style.img} alt={alt} {...props} />
        </div>
    );
}

export default ImageSkeleton;
