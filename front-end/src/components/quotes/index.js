import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuotes } from '../../redux/reducers/quotes';
import Qoute from '../quote';

function Quotes() {
    // const [qoutes, setQoutes] = useState(null);
    const dispatch = useDispatch();
    const quotes = useSelector((state) => state.quotes);
    const getQoutes = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const { data } = await axios({
                method: 'get',
                url: 'http://localhost:5000/api/v1/quotes',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(loadQuotes(data.data));
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        getQoutes();
    }, []);

    return (
        <div>
            {quotes.length > 0 ? (
                quotes.map((qoute) => {
                    return <Qoute key={qoute._id} {...qoute} />;
                })
            ) : (
                <div className="loader">Loading...</div>
            )}
        </div>
    );
}

export default Quotes;
