import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Axios } from '../helpers/Axios';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../components/modal';
import { toggleModal } from '../redux/reducers/modal';

function Chat() {
    const otherUsers = useRef([]);
    const [chat, setChat] = useState(null);
    const [chatName, setChatName] = useState('');
    const [inputChatName, setInputChatName] = useState('');
    const { chatId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal);

    const userId = useSelector((state) => state.user.data._id);

    useEffect(() => {
        async function getChat(id) {
            try {
                const { data } = await Axios.get(`/chats/${id}`);
                setChat(data.data);
            } catch (error) {
                alert(error.response.data.message);
                history.push('/chats');
            }
        }
        getChat(chatId);
    }, [chatId, history]);

    useEffect(() => {
        if (chat && chat.name) {
            setChatName(chat.name);
        } else if (chat) {
            otherUsers.current = chat.users.filter(
                (user, i) => user._id !== userId && i < 4
            );
            const userNames = otherUsers.current.map(
                (user) => `${user.firstName} ${user.lastName}`
            );
            setChatName(userNames.join(', '));
        }
    }, [chat, userId]);

    const changeChatName = async (name) => {
        try {
            const { data } = await Axios.patch(`/chats/${chat._id}`, { name });
            setChatName(data.data.name);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <main className="chat">
            <h1
                className={
                    chat ? (chat.isGroupChat ? 'group-chat-heading' : '') : ''
                }
                onClick={() => {
                    if (chat.isGroupChat) dispatch(toggleModal(true));
                }}
            >
                {chatName}
            </h1>
            <hr />
            <div className="chat-window">Hello</div>
            <footer className="message-box">
                <textarea
                    name="message"
                    className="message"
                    placeholder="Type message"
                ></textarea>
                <button>Send</button>
            </footer>
            {modal ? (
                <Modal done={() => changeChatName(inputChatName)}>
                    <h3>Change Chat Name</h3>
                    <input
                        type="text"
                        className="message"
                        placeholder="Type here..."
                        onChange={(e) => setInputChatName(e.target.value)}
                    />
                </Modal>
            ) : null}
        </main>
    );
}

export default Chat;
