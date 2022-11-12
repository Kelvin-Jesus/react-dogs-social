import React from 'react';
import Feed from '../../components/Feed/Feed';
import Head from '../../components/Head/Head';

const Home = () => {
    return (
        <section className='container main_container'>
            <Head title="Fotos" description="Home do site dogs. com o feed de fotos" />
            <Feed />
        </section>
    );
}

export default Home;
