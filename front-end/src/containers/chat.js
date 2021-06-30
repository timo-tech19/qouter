import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Axios } from '../helpers/Axios';
// import ChatItem from '../components/chatItem';

function Chat() {
    const [chat, setChat] = useState(null);
    const { chatId } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function getChat(id) {
            try {
                const { data } = await Axios.get(`/chats/${id}`);
                setChat(data.data);
                console.log(data);
            } catch (error) {
                alert(error.response.data.message);
                history.push('/chats');
            }
        }
        getChat(chatId);
    }, [chatId, history]);

    return (
        <main className="chat">
            <h1>Chat</h1>
            <hr />
            <p>{chatId}</p>
        </main>
    );
}

export default Chat;
