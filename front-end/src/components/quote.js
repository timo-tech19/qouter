import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { loadQuotes } from '../redux/reducers/quotes';
import { Axios } from '../helpers/Axios';

import Comment from '../components/comment';

// props: _id, content, createdAt
function Qoute({
    _id,
    content,
    createdAt,
    quotedBy,
    agrees,
    requoters,
    requoteData,
    comments,
}) {
    // if (requoteData) {
    //     console.log(requoteData.content);
    //     console.log(content);
    // }
    const [isAgreedActive, setIsAgreedActive] = useState(false);
    const [isReqoutedActive, setIsReqoutedActive] = useState(false);

    const [toComment, setToComment] = useState(false);

    const dispatch = useDispatch();
    const quotes = useSelector((state) => state.quotes);
    const relativeTime = DateTime.fromISO(createdAt).toRelative();
    const { user } = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();

    const updateQuotes = (quotes, updatedQuote) => {
        // Find index of quote to update
        const index = quotes.findIndex(
            (quote) => quote._id === updatedQuote._id
        );

        // Update found quote with new object containing new agrees array
        const newQuotes = [...quotes];
        newQuotes[index] = updatedQuote;
        dispatch(loadQuotes(newQuotes));
    };

    const handleAgree = async () => {
        // Get updated agreed post on the server
        const { data } = await Axios({
            url: `/quotes/${_id}/agree`,
            method: 'patch',
        });

        updateQuotes(quotes, data.data);
    };

    const handleRequote = async () => {
        const { data } = await Axios({
            method: 'post',
            url: `/quotes/${_id}/requote`,
        });

        // Update state with updatedQuote
        updateQuotes(quotes, data.data);
    };

    const showQuotePage = (e) => {
        if (e.target.className === 'quote') history.push(`/quote/${_id}`);
    };

    useEffect(() => {
        // Check is current user has liked a post
        agrees.includes(user._id)
            ? setIsAgreedActive(true)
            : setIsAgreedActive(false);

        requoters.includes(user._id)
            ? setIsReqoutedActive(true)
            : setIsReqoutedActive(false);
    }, [agrees]);

    // changing props for requoted quotes
    const quoter = requoteData ? requoteData.quotedBy : quotedBy;

    return (
        <figure className="quote" onClick={showQuotePage}>
            {requoteData ? (
                <p className="requote-title">
                    <ion-icon name="repeat-outline"></ion-icon>
                    <span>
                        Requoted By {quotedBy.firstName} {quotedBy.lastName}
                    </span>
                </p>
            ) : null}
            <header>
                <Link to={`/profile/${quoter.userName}`}>
                    @{quoter.userName}
                </Link>
                <p>{relativeTime}</p>
            </header>
            <blockquote>
                <i className="fas fa-quote-left"></i>
                <q className="content">
                    <i>{requoteData ? requoteData.content : content}</i>
                </q>
            </blockquote>
            <figcaption>
                - {quoter.firstName} {quoter.lastName}
                <img className="user-img" src={quoter.photoUrl} alt="User" />
            </figcaption>

            <footer>
                <button
                    className="action"
                    onClick={() => setToComment((prevState) => !prevState)}
                >
                    <ion-icon name="chatbubbles"></ion-icon>
                    <span>{comments.length || ''}</span>
                </button>
                <button
                    onClick={handleRequote}
                    className={`action ${isReqoutedActive ? 'active' : ''}`}
                >
                    <ion-icon name="repeat-outline"></ion-icon>
                    <span>{requoters.length || ''}</span>
                </button>
                <button
                    onClick={handleAgree}
                    className={`action ${isAgreedActive ? 'active' : ''}`}
                >
                    <ion-icon name="heart"></ion-icon>
                    <span>{agrees.length || ''}</span>
                </button>
                <button className="action">
                    <ion-icon name="share-social-outline"></ion-icon>
                </button>
            </footer>
            {toComment ? (
                <Comment
                    quoteId={_id}
                    setToComment={setToComment}
                    updateQuotes={updateQuotes}
                />
            ) : null}
        </figure>
    );
}

export default Qoute;
