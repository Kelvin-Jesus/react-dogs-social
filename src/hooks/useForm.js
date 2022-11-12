import React from 'react';

const validationTypes = {
    email: {
        regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        message: 'Email is invalid'
    },
    number: {
        regex: /^\d+$/,
        message: 'This field is of type number, please, fill it correctly'
    },
    // password: {
    //     regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    //     message: 'Password should contain, at least, 1 lower case character, 1 upper case character, a special character and min length of 8'
    // }
}

const useForm = (formType) => {

    const [ value, setValue ] = React.useState('');
    const [ error, setError ] = React.useState('');

    const validate = (valueToBeValidated) => {

        if ( formType === false ) return true;
        if ( valueToBeValidated.length === 0 || valueToBeValidated === ' ' ) {
            setError('field must not be empty!')
            return false;
        }

        if ( validationTypes[formType] && !validationTypes[formType].regex.test(value) ) {
            setError(validationTypes[formType].message);
            return false;
        }

        setError(null);
        return true;

    }

    const onChange = ({ target }) => {
        if ( error ) validate(target.value)
        return setValue(target.value)
    }

    return {
        value, 
        error,
        setValue,
        onChange,
        validate: () => validate(value),
        onBlur: () => validate(value)
    }
}

export default useForm;
