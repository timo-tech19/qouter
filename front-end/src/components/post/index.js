import { useSelector } from 'react-redux';
import { useState } from 'react';
import './post.scss';

function Post() {
    const [quote, setQuote] = useState('');
    const user = useSelector((state) => state.user);

    return (
        <div className="post">
            <div>
                <img src={user.photoUrl} alt="User profile" />
                <textarea
                    onChange={({ target }) => {
                        setQuote(target.value);
                    }}
                    placeholder="Inspire someone today..."
                    value={quote}
                />
            </div>
            <button disabled={!quote ? true : false}>Quote</button>
            <hr />
        </div>
    );
}

export default Post;
