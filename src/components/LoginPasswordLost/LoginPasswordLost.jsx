import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import useForm from '../../hooks/useForm';
import Usefetch from '../../hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../../helpers/Error';

const LoginPasswordLost = () => {

    const login = useForm();
    const { data, loading, error, request } = Usefetch();

    const handleSubmit = async e => {
        e.preventDefault();

        if ( login.validate() === false ) return;

        const { url, options } = PASSWORD_LOST({ 
            login: login.value,
            url: `${window.location.href.replace('lost-password', 'reset-password')}`
        })
        const {apiRequest, apiResponse } = await request(url, options);

    }

    return (
        <section className='animateLef'>
            <h1 className='title'>Lost your password?</h1>
            {data ? (
                <p style={{color: '#4c1'}}>{data}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Input label="Email / User" type="text" name="login" {...login} />
                    {loading ? (
                        <Button disabled>Submiting...</Button>
                    ) : (
                        <Button>Submit</Button>
                    )}
                </form>
            )}

            <Error error={error} />
        </section>
    );
}

export default LoginPasswordLost;
