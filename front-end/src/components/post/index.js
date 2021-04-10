import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import './post.scss';

function Post() {
    const [quote, setQuote] = useState('');
    const user = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios({
                url: '/quotes',
                method: 'post',
                data: {
                    content: quote,
                },
            });

            setQuote('');
        } catch (error) {
            console.log(error.response.data);
        }
    };

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
            <button disabled={!quote ? true : false} onClick={handleSubmit}>
                Quote
            </button>
            <hr />
        </div>
    );
}

export default Post;
