import React from 'react';
import style from './Footer.module.css';
import { ReactComponent as DogsSVG } from '../assets/dogs-footer.svg';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <DogsSVG /><p>Dogs. Alguns direitos reservados.</p>
        </footer>
    );
}

export default Footer;
