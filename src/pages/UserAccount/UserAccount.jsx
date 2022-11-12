import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Feed from '../../components/Feed/Feed';
import UserHeader from '../../components/UserHeader/UserHeader';
import UserPhotoPost from '../../components/UserPhotoPost/UserPhotoPost';
import UserStats from '../../components/UserStats/UserStats';
import { UserContext } from '../../contexts/UserContext';
import NotFound from '../NotFound/NotFound';

const UserAccount = () => {

    const { data } = React.useContext(UserContext);

    return (
        <section className='container'>
            <UserHeader />
            <Routes>
                <Route path="/" element={<Feed user={data?.id} />} />
                <Route path="new-post" element={<UserPhotoPost />} />
                <Route path="statistics" element={<UserStats />} />
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
        </section>
    );
}

export default UserAccount;
