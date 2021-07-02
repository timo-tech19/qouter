import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Axios } from '../helpers/Axios';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../components/modal';
import { toggleModal } from '../redux/reducers/modal';

function Chat() {
    const [otherUsers, setOtherUsers] = useState([]);
    const [chat, setChat] = useState(null);
    const [chatName, setChatName] = useState('');
    const [inputChatName, setInputChatName] = useState('');
    const [message, setMessage] = useState('');
    const { chatId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal);
    const numImages = 3;

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
        if (chat) {
            if (chat.name) {
                setChatName(chat.name);
            } else if (chat) {
                const userNames = otherUsers.map(
                    (user) => `${user.firstName} ${user.lastName}`
                );
                setChatName(userNames.join(', '));
            }

            if (!otherUsers.length) {
                setOtherUsers(
                    chat.users.filter((user, i) => user._id !== userId && i < 4)
                );
            }
        }
    }, [chat, userId, otherUsers]);

    const changeChatName = async (name) => {
        try {
            const { data } = await Axios.patch(`/chats/${chat._id}`, { name });
            setChatName(data.data.name);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const sendMessage = async () => {
        try {
            const { data } = await Axios.post('/messages', {
                content: message,
            });
            console.log(data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <main className="chat">
            <div
                className={`header ${
                    chat ? (chat.isGroupChat ? 'group-chat-header' : '') : ''
                }`}
            >
                <div className="chat-item__images">
                    {otherUsers.length - numImages > 0 ? (
                        <span className="num-images-left">
                            +{otherUsers.length - numImages}
                        </span>
                    ) : null}

                    {otherUsers.map((user, i) => {
                        if (i + 1 > numImages) return null;
                        return (
                            <div key={user._id} className="chat-item__image">
                                <img src={user.photoUrl} alt={user.firstName} />
                            </div>
                        );
                    })}
                </div>
                <h1
                    onClick={() => {
                        if (chat.isGroupChat) dispatch(toggleModal(true));
                    }}
                >
                    {chatName}
                </h1>
            </div>

            <hr />
            <div className="chat-window">
                <ul className="message-list">
                    <li className="message-item">Hello</li>
                    <li className="message-item message-item__mine">
                        how are you?
                    </li>
                    <li className="message-item">I'm fine and you?</li>
                    <li className="message-item message-item__mine">
                        I'm good
                    </li>
                </ul>
            </div>
            <footer className="message-box">
                <textarea
                    name="message"
                    className="message"
                    placeholder="Type message"
                    onChange={(e) => setMessage(e.target.value.trim())}
                ></textarea>
                <button onClick={sendMessage}>
                    <ion-icon name="paper-plane"></ion-icon>
                </button>
            </footer>
            {modal ? (
                <Modal done={() => changeChatName(inputChatName)}>
                    <h3>Change Chat Name</h3>
                    <input
                        type="text"
                        className="message"
                        placeholder="Type here..."
                        value={message}
                        onChange={(e) =>
                            setInputChatName(e.target.value.trim())
                        }
                    />
                </Modal>
            ) : null}
        </main>
    );
}

export default Chat;
