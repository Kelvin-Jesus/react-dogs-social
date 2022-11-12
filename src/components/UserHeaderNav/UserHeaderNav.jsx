import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ReactComponent as MyPhotosIcon } from '../../assets/feed.svg';
import { ReactComponent as NewPostIcon } from '../../assets/adicionar.svg';
import { ReactComponent as LogoutIcon } from '../../assets/sair.svg';
import { ReactComponent as StatsIcon } from '../../assets/estatisticas.svg';
import style from './UserHeaderNav.module.css';
import useMatchMedia from '../../hooks/useMatchMedia';

const UserHeaderNav = () => {

    const { userLogout } = React.useContext(UserContext);
    const mobile = useMatchMedia('(max-width: 40rem)');
    const [ mobileMenu, setMobileMenu ] = React.useState(false);

    const { pathname } = useLocation();
    React.useEffect(() => {
        setMobileMenu(false);
    }, [ pathname ]);

    return (
        <>
        { mobile && <button 
            aria-label="Menu" 
            className={`
                ${style.mobile_btn} 
                ${mobileMenu && style.mobile_btn_active}
            `}
            onClick={() => setMobileMenu(!mobileMenu)}
        ></button>}
        <nav className={`${mobile ? style.nav_mobile : style.nav} ${mobileMenu && style.nav_mobile_active}`}>
            <NavLink title="My Posts" to="/account" end>
                <MyPhotosIcon />
                { mobile && 'My Photos' }
            </NavLink>
            <NavLink title="Your Statistics" to="/account/statistics">
                <StatsIcon />
                { mobile && 'Statistics' }
            </NavLink>
            <NavLink title="Add Post" to="/account/new-post">
                <NewPostIcon />
                { mobile && 'New Post' }
            </NavLink>
            <button title="Logout" onClick={userLogout}>
                <LogoutIcon />
                { mobile && 'Sair' }
            </button>
        </nav>
        </>
    );
}

export default UserHeaderNav;
