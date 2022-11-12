import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../../helpers/Error';
import useForm from '../../hooks/useForm';
import { USER_POST } from '../../api';
import { UserContext } from '../../contexts/UserContext';
import Usefetch from '../../hooks/useFetch';
import Head from '../Head/Head';

const LoginCreate = () => {

    const { userLogin } = React.useContext(UserContext);
    const { loading, error, request } = Usefetch();

    const username = useForm();
    const email = useForm('email');
    const password = useForm();

    const handleSubmit = async event => {
        event.preventDefault();
        const { url, options } = USER_POST({
            username: username.value,
            email: email.value,
            password: password.value,
        });
        const { apiRequest } = await request(url, options);
        if ( apiRequest.ok ) userLogin(username.value, password.value);

    }

    return (
        <section className='animeLeft'>
            <Head title="Don't have an account yet? signup now" description="Create an account!" />
            <h1 className='title'>Sign-up</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    label="User" 
                    name="username" 
                    {...username} 
                />
                <Input 
                    label="Email" 
                    type="email" 
                    name="email" 
                    {...email} 
                />
                <Input 
                    label="Password" 
                    type="password" 
                    name="password" 
                    {...password} 
                />
                { loading 
                    ? 
                        <Button disabled>Signing...</Button>
                    :
                        <Button>Sign-up</Button>
                }
                <Error error={error} />
            </form>
        </section>
    );
}

export default LoginCreate;
