import axios from 'axios';
import { useEffect, useState } from 'react';
import Qoute from '../quote';

function Quotes() {
    const [qoutes, setQoutes] = useState(null);
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
            setQoutes(data.data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        getQoutes();
    }, []);

    return (
        <div>
            {qoutes
                ? qoutes.map((qoute) => {
                      return <Qoute key={qoute._id} {...qoute} />;
                  })
                : null}
        </div>
    );
}

export default Quotes;
