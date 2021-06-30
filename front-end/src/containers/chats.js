import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Axios } from '../helpers/Axios';

function Chats() {
    const history = useHistory();

    useEffect(() => {
        async function getChats() {
            const { data } = await Axios.get('/chats');
            console.log(data.data);
        }
        getChats();
    }, []);

    return (
        <main className="chats">
            <h1>
                Chats{' '}
                <button
                    className="add-chat-btn"
                    onClick={() => history.push('/new-chat')}
                >
                    <ion-icon name="add-circle-outline"></ion-icon>
                </button>
            </h1>
            <hr />
            <div className="search-form"></div>
        </main>
    );
}

export default Chats;
