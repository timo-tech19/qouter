import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { postQuote } from '../redux/reducers/quotes';

function Post() {
    const [quote, setQuote] = useState('');
    const dispatch = useDispatch();
    const userPhoto = useSelector((state) => state.user.data.photoUrl);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(postQuote(quote));
        setQuote('');
    };

    return (
        <div className="post">
            <div>
                <img src={userPhoto} alt="User profile" />
                <textarea
                    onChange={({ target }) => {
                        setQuote(target.value);
                    }}
                    placeholder="Inspire someone today..."
                    value={quote}
                />
            </div>
            <button disabled={!quote} onClick={handleSubmit}>
                Quote
            </button>
            <hr />
        </div>
    );
}

export default Post;
