import { DateTime } from 'luxon';
import './quote.scss';

// props: _id, content, createdAt
function Qoute({ content, createdAt, quotedBy }) {
    const relativeTime = DateTime.fromISO(createdAt).toRelative();
    return (
        <figure className="quote">
            <header>
                <p>{relativeTime}</p>
                <p>@{quotedBy.userName}</p>
            </header>
            <blockquote>
                <i className="fas fa-quote-left"></i>
                <i className="content">{content}</i>
            </blockquote>
            <figcaption>
                By {quotedBy.firstName} {quotedBy.lastName}
                <img className="user-img" src={quotedBy.photoUrl} alt="User" />
            </figcaption>

            <footer>
                <button className="action">
                    <i className="fas fa-comment-dots"></i>
                </button>
                <button className="action">
                    <i className="fas fa-sync"></i>
                </button>
                <button className="action">
                    <i className="fas fa-check-square"></i>
                </button>
                <button className="action">
                    <i className="fas fa-times-circle"></i>
                </button>
            </footer>
        </figure>
    );
}

export default Qoute;
