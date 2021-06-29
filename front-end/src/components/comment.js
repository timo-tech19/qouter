import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentQuote } from '../redux/reducers/quotes';

function Comment({ quoteId, setToComment }) {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleComment = async (e) => {
        e.preventDefault();
        if (!comment) return;

        dispatch(commentQuote(quoteId, comment));

        setComment('');
        setToComment(false);
    };

    return (
        <form className="comment">
            <textarea
                onChange={({ target }) => {
                    setComment(target.value);
                }}
                placeholder="Type your comment..."
                value={comment}
            ></textarea>
            <button onClick={handleComment} type="submit" disabled={!comment}>
                Comment
            </button>
        </form>
    );
}

export default Comment;
