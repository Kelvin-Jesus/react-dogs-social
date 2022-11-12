import React from 'react';

const Usefetch = () => {

    const [ data, setData ] = React.useState(null);
    const [ error, setError ] = React.useState(null);
    const [ loading, setLoading ] = React.useState(false);

    const request = React.useCallback(async (url, options) => {
        let apiRequest;
        let apiResponse;

        try {
            setError(null);
            setLoading(true);
            apiRequest = await fetch(url, options);
            apiResponse = await apiRequest.json();

            if ( !apiRequest.ok ) throw new Error(apiResponse.message);
        }

        catch ( err ) {
            apiResponse = null;
            setError(err.message);
        }

        finally {
            setData(apiResponse);
            setLoading(false);
            return { apiRequest, apiResponse };
        }

    }, [])

    return {
        data, 
        error,
        loading,
        request
    };
}

export default Usefetch;
