import React from 'react';
import FeedModal from '../FeedModal/FeedModal';
import FeedPhotos from '../FeedPhotos/FeedPhotos';

const Feed = ({ user }) => {

    const [ modalPhoto, setModalPhoto ] = React.useState(null);
    const [ pages, setPages ] = React.useState([1, 2]);
    const [ isInfinite, setIsInfinite ] = React.useState(true);

    React.useEffect(() => {
        let wait = false;

        const infiniteScroll = () => {
            if ( isInfinite === false ) return;

            const scrollPosition = window.scrollY;
            const pageHeight = document.body.offsetHeight - window.innerHeight;

            if ( scrollPosition > (pageHeight * 0.75) && !wait ) {
                setPages(pages => [ ...pages, pages.length + 1]);
                setTimeout(() => wait = false, 500);
            }

        }
        
        window.addEventListener('wheel', infiniteScroll);
        window.addEventListener('scroll', infiniteScroll);

        return () => {
            window.removeEventListener('wheel', infiniteScroll);
            window.removeEventListener('scroll', infiniteScroll);
        }
    }, [isInfinite])

    return (
        <section>
            {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
            { pages && pages.map(page => (
                <FeedPhotos 
                    user={user} 
                    key={page} 
                    page={page} 
                    setModalPhoto={setModalPhoto} 
                    setIsInfinite={setIsInfinite}
                />
            ))}
        </section>
    );
}

export default Feed;
