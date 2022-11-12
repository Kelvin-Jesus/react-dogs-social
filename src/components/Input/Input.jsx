import React from 'react';
import style from './Input.module.css';

const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
    return (
    <div className={style.input_wrapper}>
        <label className={style.input_label} htmlFor={name}>{label}</label>
        <input 
            type={type ?? "text"} 
            id={name} 
            name={name} 
            className={style.input} 
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
        {error && <p className={style.input_error}>{error}</p>}
    </div>
    );
}

export default Input;
