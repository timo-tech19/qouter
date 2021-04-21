import { useState } from 'react';
import { Axios } from '../helpers/Axios';
import { useSelector } from 'react-redux';

function Comment({ quoteId, setToComment, updateQuotes }) {
    const quotes = useSelector((state) => state.quotes);
    const [comment, setComment] = useState('');

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            if (!comment) return;
            const { data } = await Axios.post(`/quotes/${quoteId}/comment`, {
                content: comment,
            });
            console.log(data);
            updateQuotes(quotes, data.data);
            setComment('');
            setToComment(false);
        } catch (error) {
            console.log(error.response.data);
        }
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
