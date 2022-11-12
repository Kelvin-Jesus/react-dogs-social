import React from 'react';

const Error = ({ error }) => {

    if ( !error ) return null;

    return <p className='error-component'>{error}</p>;

}

export default Error;