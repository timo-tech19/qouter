import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchQuotes } from '../redux/reducers/quotes';
import Quote from './quote';

function Quotes() {
    const dispatch = useDispatch();
    const { data, status } = useSelector((state) => state.quotes);

    // Get quotes when component mounts
    useEffect(() => {
        if (status === 'idle') dispatch(fetchQuotes());
    }, [status, dispatch]);

    return (
        <div>
            {status === 'loading' ? (
                <div className="loader">Loading...</div>
            ) : (
                data.map((quote) => {
                    return <Quote key={quote._id} {...quote} />;
                })
            )}
        </div>
    );
}

export default Quotes;
