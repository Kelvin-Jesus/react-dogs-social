import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../api';

const setTokenOnLocalStorage = token => {
    return window.localStorage.setItem('token', token);
}

const getTokenOnLocalStorage = () => {
   return window.localStorage.getItem('token');
}

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {

    const [ data, setData ] = React.useState(null);
    const [ login, setLogin ] = React.useState(true);
    const [ loading, setLoading ] = React.useState(false);
    const [ error, setError ] = React.useState(null);
    const navigate = useNavigate();
    
    let token = getTokenOnLocalStorage();

    const getUser = async token => {
        const { url, options } = USER_GET(token)
        const request = await fetch(url, options);
        setData(await request.json());
        return setLogin(true);
    }

    const userLogout = React.useCallback(
        async function () {
            setData(null);
            setError(null);
            setLoading(false);
            setLogin(false);
            window.localStorage.removeItem('token');
            navigate('/login');
        }, 
    [navigate]);

    const userLogin = async (username, password) => {
        try {
            setError(null);
            setLoading(true);
            const { url, options } = TOKEN_POST({ username, password });
            const tokenRequest = await fetch(url, options);
            if ( !tokenRequest.ok ) throw new Error(`Error: ${tokenRequest.statusText}`);
            const { token } = await tokenRequest.json()
            setTokenOnLocalStorage(token)
            await getUser(token);
            navigate('/account');
        } catch ( err )  { 
            setError(err.message);
            setLogin(false);
        }
        finally {
            return setLoading(false);
        }
    }

    React.useEffect(() => {
        const automaticLogin = async () => {
            const token = getTokenOnLocalStorage()
            if ( !token ) return setLogin(false);
           
            try {
                setError(null);
                setLoading(true);
                const { url, options } = TOKEN_VALIDATE_POST(token);
                const request = await fetch(url, options);
                if ( !request.ok ) throw new Error('Token inválido!');
                await getUser(token);
            } catch ( err ) { userLogout(); }
            finally { return setLoading(false); }
        }
        automaticLogin()
    }, [userLogout]);

    return (
        <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }}>
            { children }
        </UserContext.Provider>
    );
}
