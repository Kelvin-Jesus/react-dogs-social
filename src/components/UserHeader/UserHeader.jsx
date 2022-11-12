import React from 'react';
import { useLocation } from 'react-router-dom';
import UserHeaderNav from '../UserHeaderNav/UserHeaderNav';
import style from './UserHeader.module.css';

const UserHeader = () => {

    const [ title, setTitle ] = React.useState('');
    const location = useLocation();
    
    React.useEffect(() => {

        const { pathname } = location;

        let title;
        if ( pathname === '/account' )
            title = 'Account';
        if ( pathname === '/account/statistics' )
            title = 'Statistics';
        if ( pathname === '/account/new-post' )
            title = 'New Post';

        return setTitle(title);

    }, [location]);

    return (
        <header className={style.header}>
            <h1 className='title'>{title}</h1>
            <UserHeaderNav />
        </header>
    );
}

export default UserHeader;
