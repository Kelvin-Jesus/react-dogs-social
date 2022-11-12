import React from 'react';
import Head from '../Head/Head';
import UseFetch from '../../hooks/useFetch';
import Loading from '../../helpers/Loading/Loading';
// import UserStatsGraphs from '';
import { GET_STATS } from '../../api';
import Error from '../../helpers/Error';

const UserStatsGraphs = React.lazy(() => import('../UserStatsGraphs/UserStatsGraphs'));

const UserStats = () => {

    const { data, error, loading, request } = UseFetch();

    React.useEffect(() => {
        (async () => {
            const token = window.localStorage.getItem('token');
            const { url, options } = GET_STATS(token);
            await request(url, options);
        })()
    }, [request]);

    if ( loading ) return <Loading />
    if ( error ) {return <Error error={error.message} />}
    if ( !data ) return null;

    return (
        <React.Suspense fallback={<></>}>
            <Head title="Your stats" description="Here u can see your statatistics on our social media!" />
            <UserStatsGraphs data={data} />
        </React.Suspense>
    );
}

export default UserStats;
