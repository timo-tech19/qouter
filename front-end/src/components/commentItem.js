import { DateTime } from 'luxon';

function CommentItem({ content, commentBy, createdAt }) {
    const { firstName, lastName, photoUrl, userName } = commentBy;
    const relativeTime = DateTime.fromISO(createdAt).toRelative();
    return (
        <div className="comment">
            <div className="user-image">
                <img className="user-img" src={photoUrl} alt="Commentor" />
            </div>
            <div className="content">
                <div className="header">
                    <p>
                        <span>{firstName}</span> <span>{lastName}</span>{' '}
                        <span>@{userName}</span>
                    </p>
                    <p>{relativeTime}</p>
                </div>
                <div className="body">{content}</div>
            </div>
        </div>
    );
}

export default CommentItem;
