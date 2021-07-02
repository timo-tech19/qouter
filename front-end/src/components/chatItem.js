import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ChatItem({ _id, name, users, lastMessage }) {
    const [chatName, setChatName] = useState(name);
    const [otherUsers, setOtherUsers] = useState([]);
    const history = useHistory();
    const userId = useSelector((state) => state.user.data._id);

    useEffect(() => {
        if (!otherUsers.length)
            setOtherUsers(users.filter((user) => user._id !== userId));

        if (!name) {
            const userNames = otherUsers.map(
                (user) => `${user.firstName} ${user.lastName}`
            );
            setChatName(userNames.join(', '));
        }
    }, [name, users, userId, otherUsers]);

    return (
        <li className="chat-item" onClick={() => history.push(`/chats/${_id}`)}>
            <div className="chat-item__images">
                {otherUsers.map((user, i) => {
                    if (i > 2) return null;
                    return (
                        <div key={user._id} className="chat-item__image">
                            <img src={user.photoUrl} alt={user.firstName} />
                        </div>
                    );
                })}
            </div>
            <div className="chat-item__details">
                <h4 className="chat-item__title">{chatName}</h4>
                <p className="chat-item__last-message">
                    {lastMessage || 'New chat. Be the first to send a message'}
                </p>
            </div>
        </li>
    );
}

export default ChatItem;
