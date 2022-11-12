import React from 'react';
import { PHOTOS_GET } from '../../api';
import Error from '../../helpers/Error';
import Loading from '../../helpers/Loading/Loading';
import Usefetch from '../../hooks/useFetch';
import FeedPhoto from './FeedPhoto';

import style from './FeedPhotos.module.css';

const TOTAL_ITENS_PER_PAGE = 6;

const FeedPhotos = ({ setIsInfinite, page, user, setModalPhoto }) => {

    const { data, loading, error, request } = Usefetch();

    React.useEffect(() => {

        const getFeedFromApi = async () => {
            const { url, options } = PHOTOS_GET({ page: page, total: 6, user });
            const { apiRequest, apiResponse } = await request(url, options);

            if ( apiRequest && apiRequest.ok && apiResponse.length < TOTAL_ITENS_PER_PAGE ) setIsInfinite(false)
        }
        getFeedFromApi()

    }, [request, user, page, setIsInfinite]);

    if ( error ) return <Error error={error} />
    if ( loading ) return <Loading />
    if ( data )
        return (
            <ul className={`${style.feed} animeLeft`}>
                { data.map( photo => <FeedPhoto setModalPhoto={setModalPhoto} key={photo.id} photo={photo} />) }
            </ul>
        );
    else return null;
}

export default FeedPhotos;
