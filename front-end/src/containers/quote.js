import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentItem from '../components/commentItem';
import Qoute from '../components/quote';
import { Axios } from '../helpers/Axios';

function QuoteContainer() {
    const { quoteId } = useParams();
    const [quote, setQuote] = useState(null);

    const getQuote = async () => {
        const { data } = await Axios.get(`/quotes/${quoteId}`);
        setQuote(data.data);
    };

    useEffect(() => {
        getQuote();
    }, []);

    return (
        <main>
            <h1>Quote</h1>
            <hr />
            {quote ? <Qoute {...quote} /> : null}
            <h3>Comments</h3>
            {quote ? (
                quote.comments.map((comment) => (
                    <CommentItem key={comment._id} {...comment} />
                ))
            ) : (
                <h4>No comments yet</h4>
            )}
        </main>
    );
}

export default QuoteContainer;
