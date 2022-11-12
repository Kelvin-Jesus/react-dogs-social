import React from 'react';

import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { PHOTO_POST } from '../../api';

import style from './UserPhotoPost.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Error from '../../helpers/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../Head/Head';

const UserPhotoPost = () => {

    const name = useForm();
    const weight = useForm('number');
    const age = useForm('number');
    const [ img, setImg ] = React.useState({});
    const { data, error, loading, request } = useFetch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if ( data ) navigate('/account')
    }, [data, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('img', img.raw);
        formData.append('nome', name.value);
        formData.append('peso', weight.value);
        formData.append('idade', age.value);

        const token = window.localStorage.getItem('token');
        const { url, options } = PHOTO_POST(formData, token);
        request(url, options);
    }

    const handleImgChange = ({ target }) => {
        setImg({
            raw: target.files[0],
            preview: URL.createObjectURL(target.files[0])
        });
    }

    return (
        <section className={`${style.photoPost} animeLeft`}>
            <Head title="Post your photo" description="Here is where u can upload your best photos, so your friends can see them!" />
            <form onSubmit={handleSubmit}>
                <Input label="name" name="name" {...name} />
                <Input label="weight" name="weight" {...weight} />
                <Input label="Age" name="Age" {...age} />
                <input 
                    className={style.file} 
                    type="file" 
                    name="img" 
                    id="img" 
                    onChange={handleImgChange} 
                />
                { loading ? (
                    <Button disabled>Enviando...</Button>
                ) : (
                    <Button>Enviar</Button>
                )
                }
                <Error error={error} />
            </form>
            <div>
                { img.preview && 
                    <div 
                        className={style.preview} 
                        style={{ backgroundImage: `url('${img.preview}')` }}
                    ></div>
                }
            </div>
        </section>
    );
}

export default UserPhotoPost;
