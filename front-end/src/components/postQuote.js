import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { loadQuotes } from '../redux/reducers/quotes';
import { Axios } from '../helpers/Axios';

function Post() {
    const [quote, setQuote] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const quotes = useSelector((state) => state.quotes);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await Axios({
                url: '/quotes',
                method: 'post',
                data: {
                    content: quote,
                },
            });

            setQuote('');
            const newQuotes = [data.data, ...quotes];
            dispatch(loadQuotes(newQuotes));
        } catch (error) {
            console.log(error);
            // console.log(error.response.data);
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
            <button disabled={!quote} onClick={handleSubmit}>
                Quote
            </button>
            <hr />
        </div>
    );
}

export default Post;
