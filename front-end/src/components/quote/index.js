import axios from 'axios';
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { loadQuotes } from '../../redux/reducers/quotes';
import { useSelector, useDispatch } from 'react-redux';
import './quote.scss';
// props: _id, content, createdAt
function Qoute({ _id, content, createdAt, quotedBy, agrees }) {
    const dispatch = useDispatch();
    const quotes = useSelector((state) => state.quotes);
    const [isAgreedActive, setIsAgreedActive] = useState(false);

    const relativeTime = DateTime.fromISO(createdAt).toRelative();

    const { user, token } = JSON.parse(localStorage.getItem('user'));

    const handleAgree = async () => {
        // Get updated agreed post on the server
        const { data } = await axios({
            url: `http://localhost:5000/api/v1/quotes/${_id}/agree`,
            method: 'patch',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Find index of quote to update
        const index = quotes.findIndex((quote) => quote._id === data.data._id);

        // Update found quote with new object containing new agrees array
        const newQuotes = [...quotes];
        newQuotes[index] = data.data;
        dispatch(loadQuotes(newQuotes));
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
                <button className="action">
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
