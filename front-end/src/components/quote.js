import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadQuotes } from '../redux/reducers/quotes';
import { Axios } from '../helpers/Axios';

// props: _id, content, createdAt
function Qoute({ _id, content, createdAt, quotedBy, agrees }) {
    const [isAgreedActive, setIsAgreedActive] = useState(false);

    const dispatch = useDispatch();
    const quotes = useSelector((state) => state.quotes);
    const relativeTime = DateTime.fromISO(createdAt).toRelative();
    const { user } = JSON.parse(localStorage.getItem('user'));

    const handleAgree = async () => {
        // Get updated agreed post on the server
        const { data } = await Axios({
            url: `/quotes/${_id}/agree`,
            method: 'patch',
        });

        // Find index of quote to update
        const index = quotes.findIndex((quote) => quote._id === data.data._id);

        // Update found quote with new object containing new agrees array
        const newQuotes = [...quotes];
        newQuotes[index] = data.data;
        dispatch(loadQuotes(newQuotes));
    };

    const handleRequote = async () => {
        const { data } = await Axios({
            method: 'post',
            url: `/quotes/${_id}/requote`,
        });

        console.log(data);
    };

    useEffect(() => {
        // Check is current user has liked a post
        agrees.includes(user._id)
            ? setIsAgreedActive(true)
            : setIsAgreedActive(false);
    }, [agrees]);

    return (
        <figure className="quote">
            <header>
                <p>@{quotedBy.userName}</p>
                <p>{relativeTime}</p>
            </header>
            <blockquote>
                <i className="fas fa-quote-left"></i>
                <i className="content">{content}</i>
            </blockquote>
            <figcaption>
                - {quotedBy.firstName} {quotedBy.lastName}
                <img className="user-img" src={quotedBy.photoUrl} alt="User" />
            </figcaption>

            <footer>
                <button className="action">
                    <i className="fas fa-comment-dots"></i>
                </button>
                <button onClick={handleRequote} className="action">
                    <i className="fas fa-sync"></i>
                </button>
                <button
                    onClick={handleAgree}
                    className={`action ${isAgreedActive ? 'active' : ''}`}
                >
                    <i className="fas fa-thumbs-up"></i>
                    <span>{agrees.length || ''}</span>
                </button>
                <button className="action">
                    <i className="fas fa-thumbs-down"></i>
                </button>
            </footer>
        </figure>
    );
}

export default Qoute;
