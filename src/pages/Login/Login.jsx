import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginSignUp from '../../components/LoginSignUp/LoginSignUp';
import LoginPasswordLost from '../../components/LoginPasswordLost/LoginPasswordLost';
import LoginPasswordReset from '../../components/LoginPasswordReset/LoginPasswordReset';
import { UserContext } from '../../contexts/UserContext';
import style from './Login.module.css'
import NotFound from '../NotFound/NotFound';

const Login = () => {

    const { login } = React.useContext(UserContext);

    if ( login === true ) return <Navigate to="/account" />

    return (
        <section className={style.login_section}>
            <div className={style.forms}>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="sign-up" element={<LoginSignUp />} />
                    <Route path="lost-password" element={<LoginPasswordLost />} />
                    <Route path="reset-password" element={<LoginPasswordReset />} />
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </div>
        </section>
    );
}

export default Login;
