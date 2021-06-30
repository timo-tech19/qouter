import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Axios } from '../helpers/Axios';
import ChatItem from '../components/chatItem';

function Chats() {
    const history = useHistory();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        async function getChats() {
            const { data } = await Axios.get('/chats');
            setChats(data.data);
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
            <ul className="chats-list">
                {chats.length > 0 ? (
                    chats.map((chat) => <ChatItem key={chat._id} {...chat} />)
                ) : (
                    <p className="no-results">No Chats</p>
                )}
            </ul>
        </main>
    );
}

export default Chats;
