import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Axios } from '../../helpers/Axios';
import { loadQuotes } from '../../redux/reducers/quotes';
import Qoute from '../quote';

function Quotes() {
    // const [qoutes, setQoutes] = useState(null);
    const dispatch = useDispatch();
    const quotes = useSelector((state) => state.quotes);
    const getQoutes = async () => {
        try {
            const { data } = await Axios({
                method: 'get',
                url: '/quotes',
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
