import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../api';
import PhotoContent from '../../components/Photo/PhotoContent';
import Error from '../../helpers/Error';
import Loading from '../../helpers/Loading/Loading';
import Usefetch from '../../hooks/useFetch';

const PhotoPage = () => {

    const { id } = useParams();
    const { data, loading, error, request } = Usefetch();

    React.useEffect(() => {
        const { url, options } = PHOTO_GET(id);
        request(url, options);
    }, [request, id]);

    if ( error ) return <Error error={error} />
    if ( loading ) return <Loading />
    if ( data ) return (
        <section className='container main-container'>
            <PhotoContent data={data} single={true} />
        </section>
    );
    else return null;
}

export default PhotoPage;
