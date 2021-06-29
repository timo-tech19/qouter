import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { likeQuote, reQuote } from '../redux/reducers/quotes';

import Comment from '../components/comment';

// props: _id, content, createdAt
function Qoute({
    _id,
    content,
    createdAt,
    quotedBy,
    likes,
    requoters,
    requoteData,
    comments,
}) {
    // if (requoteData) {
    //     console.log(requoteData.content);
    //     console.log(content);
    // }
    const [isLikedActive, setIsLikedActive] = useState(false);
    const [isReqoutedActive, setIsReqoutedActive] = useState(false);
    const [toComment, setToComment] = useState(false);

    const user = useSelector((state) => state.user.data);
    // const quotes = useSelector((state) => state.quotes);

    const dispatch = useDispatch();
    const history = useHistory();

    const relativeTime = DateTime.fromISO(createdAt).toRelative();

    // const updateQuotes = (quotes, updatedQuote) => {
    //     // Find index of quote to update
    //     const index = quotes.findIndex(
    //         (quote) => quote._id === updatedQuote._id
    //     );

    //     // Update found quote with new object containing new likes array
    //     const newQuotes = [...quotes];
    //     newQuotes[index] = updatedQuote;
    //     dispatch(loadQuotes(newQuotes));
    // };

    const showQuotePage = (e) => {
        if (e.target.className === 'quote') history.push(`/quote/${_id}`);
    };

    useEffect(() => {
        // // Check is current user has liked a post
        likes.includes(user._id)
            ? setIsLikedActive(true)
            : setIsLikedActive(false);

        requoters.includes(user._id)
            ? setIsReqoutedActive(true)
            : setIsReqoutedActive(false);
    }, [likes, requoters, user._id]);

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
                    onClick={() => {
                        dispatch(reQuote(_id));
                    }}
                    className={`action ${isReqoutedActive ? 'active' : ''}`}
                >
                    <ion-icon name="repeat-outline"></ion-icon>
                    <span>{requoters.length || ''}</span>
                </button>
                <button
                    onClick={() => {
                        dispatch(likeQuote(_id));
                    }}
                    className={`action ${isLikedActive ? 'active' : ''}`}
                >
                    <ion-icon name="heart"></ion-icon>
                    <span>{likes.length || ''}</span>
                </button>
                <button className="action">
                    <ion-icon name="share-social-outline"></ion-icon>
                </button>
            </footer>
            {toComment ? (
                <Comment
                    quoteId={_id}
                    setToComment={setToComment}
                    // updateQuotes={updateQuotes}
                />
            ) : null}
        </figure>
    );
}

export default Qoute;
