import React from 'react';
import style from './FeedModal.module.css';
import Usefetch from '../../hooks/useFetch';
import { PHOTO_GET } from '../../api';
import PhotoContent from '../Photo/PhotoContent';
import Error from '../../helpers/Error';
import Loading from '../../helpers/Loading/Loading';

const FeedModal = ({ photo, setModalPhoto }) => {

    const { data, loading, error, request } = Usefetch();

    React.useEffect(() => {
        const { url, options } = PHOTO_GET(photo?.id);
        request(url, options);
    }, [photo, request]);

    const handleOutsideClick = e => (e.target !== e.currentTarget) ? '' : setModalPhoto(null);

    return (
        <div className={style.modal} onClick={handleOutsideClick}>
            {error && <Error error={error} />}
            {loading && <Loading />}
            {data && <PhotoContent data={data} />}
        </div>
    );
}

export default FeedModal;
