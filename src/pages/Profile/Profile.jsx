import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../../components/Feed/Feed';
import Head from '../../components/Head/Head';

const Profile = () => {

    const { user } = useParams();

    return (
        <section className='container mainSection'>
            <Head title={user} description={`${user}'s profile account`} />
            <h1 className='title'>{user}</h1>
            <Feed user={user} />
        </section>
    );

}

export default Profile;