import React from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import Error from '../../helpers/Error';
import useForm from '../../hooks/useForm';
import Button from '../Button/Button';
import Input from '../Input/Input';
import style from './LoginForm.module.css';
import styleBtn from '../Button/Button.module.css';
import Head from '../Head/Head';

const LoginForm = () => {

    const username = useForm();
    const password = useForm('password');

    const { userLogin, error, loading } = React.useContext(UserContext);

    const handleSubmit = async e => {
        e.preventDefault();

        if ( !username.validate() || !password.validate() ) return ;
        return userLogin(username.value, password.value)
    
    }

    return (
        <section className='animateLef'>
            <Head title="Login Page" description="Login into your account" />
            <h1 className='title'>Login</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                <Input label="Username" name="username" {...username} />
                <Input label="Password" type="password" name="password" {...password} />
                { !loading ? <Button>Sign-in</Button> : <Button disabled>Loading...</Button>}
                { error && <Error error={error && 'Invalid login or password!'} />}
            </form>
            <Link className={style.lost} to="/login/lost-password">Lost password?</Link>
            <div className={style.sign_up}>
                <h2 className={style.subtitle}>Sign Up</h2>
                <p>Don't have an account yet? Sign Up, it's free!</p>
                <Link className={`${styleBtn.button} ${styleBtn.no_bg}`} to="/login/sign-up">Sign up</Link>
            </div>
        </section>
    );
}

export default LoginForm;
