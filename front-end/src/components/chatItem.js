import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ChatItem({ _id, chatName, users, lastMessage }) {
    const [name, setName] = useState('');
    const history = useHistory();
    const otherUsers = useRef([]);
    const userId = useSelector((state) => state.user.data._id);

    useEffect(() => {
        if (!chatName) {
            otherUsers.current = users.filter((user) => user._id !== userId);
            const userNames = otherUsers.current.map(
                (user) => `${user.firstName} ${user.lastName}`
            );
            setName(userNames.join(', '));
        }
    }, [chatName, users, userId, otherUsers]);

    return (
        <li className="chat-item" onClick={() => history.push(`/chats/${_id}`)}>
            <div className="chat-item__images">
                {otherUsers.current.map((user, i) => {
                    if (i > 2) return null;
                    return (
                        <div
                            key={user._id}
                            className="chat-item__image"
                            style={{ right: `${(100 / users.length) * i}%` }}
                        >
                            <img src={user.photoUrl} alt={user.firstName} />
                        </div>
                    );
                })}
            </div>
            <div className="chat-item__details">
                <h4 className="chat-item__title">{name}</h4>
                <p className="chat-item__last-message">
                    {lastMessage || 'New chat. Be the first to send a message'}
                </p>
            </div>
        </li>
    );
}

export default ChatItem;
