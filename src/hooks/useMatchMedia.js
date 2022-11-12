import React from 'react';

const useMatchMedia = (media) => {

    const [ matches, setMatches ] = React.useState(null);

    React.useEffect(() => {
        const changeMatch = () => {
            const { matches } = window.matchMedia(media);
            setMatches(matches)
        }
        changeMatch()
        window.addEventListener('resize', changeMatch)
        return () => {
            window.removeEventListener('resize', changeMatch)
        };
    }, [media])

    return matches;
}

export default useMatchMedia;
