import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_RESET } from '../../api';
import Error from '../../helpers/Error';
import Usefetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import Button from '../Button/Button';
import Input from '../Input/Input';

const LoginPasswordReset = () => {

    const [ login, setLogin ] = React.useState('');
    const [ key, setKey ] = React.useState('');
    const { error, loading, request } = Usefetch();

    const navigate = useNavigate();

    const password = useForm();

    const handleSubmit = async e => {
        e.preventDefault();
        if ( password.validate() ) return;

        const { url, options } = PASSWORD_RESET({
            login, 
            key,
            password: password.value
        });

        const { responseApi } = await request(url, options);
        if ( responseApi.ok ) navigate('/login');
    }

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get('key');
        const login = params.get('login');

        if ( key ) setKey(key);
        if ( login ) setLogin(login);
    }, []);

    return (
        <section className='animateLef'>
            <h1 className='title'>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <Input label="New Password" type="password" name="password" {...password}/>
                {loading ? <Button disabled>Reset</Button> : <Button>Reseting...</Button>}
            </form>
            <Error  error={error}/>
        </section>
    );
}

export default LoginPasswordReset;
