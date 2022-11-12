import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { ReactComponent as DogsSVG } from '../assets/dogs.svg';
import { UserContext } from '../contexts/UserContext';

const Header = () => {

    const { data } = React.useContext(UserContext);

    return (
        <header className={style.header}>
            <nav className={`${style.nav} container`}>
                <Link className={style.logo} to="/" aria-label='Dogs - Home'>
                    <DogsSVG />
                </Link>
                { data ? (
                    <Link className={style.login} to="/account">{data.username}</Link>
                    )
                    : (
                        <Link className={style.login} to="/login">Sign-in | Sign-up</Link>
                    )
                }
            </nav>
        </header>
    );
}

export default Header;
