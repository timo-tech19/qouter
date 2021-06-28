import React, { useState, useRef } from 'react';
import { Axios } from '../helpers/Axios';

function NewChat({ activeUser }) {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const input = useRef(null);

    const handleTyping = (e) => {
        const term = e.target.value.trim();
        if (term === '') {
            setUsers([]);
            return;
        }
        setTimeout(async () => {
            try {
                const { data } = await Axios({
                    method: 'post',
                    url: '/users',
                    data: { term: e.target.value },
                });
                let foundUsers = data.data;

                foundUsers = foundUsers.filter((user) => {
                    return user._id !== activeUser._id;
                });

                foundUsers = foundUsers.filter((user) => {
                    const selectedUserIDs = selectedUsers.map(
                        (user) => user._id
                    );
                    return !selectedUserIDs.includes(user._id);
                });

                setUsers(foundUsers);
            } catch (error) {
                console.log(error.response);
            }
        }, 1000);
    };

    const selectUser = (user) => {
        setSelectedUsers((prevstate) => [...prevstate, user]);
        setUsers([]);
        input.current.value = '';
        input.current.focus();
    };

    const removeSelectedUser = (id) => {
        setSelectedUsers((prevstate) =>
            prevstate.filter((user) => user._id !== id)
        );
    };

    return (
        <main className="new-chat">
            <h1>New Chat</h1>
            <hr />
            <div className="chat-details">
                <div className="search-form">
                    <label htmlFor="search">To: </label>
                    {selectedUsers.map(({ _id, firstName, lastName }) => {
                        return (
                            <span className="selected-user-names" key={_id}>
                                {firstName + ' ' + lastName}
                                <ion-icon
                                    name="close-circle-outline"
                                    onClick={() => removeSelectedUser(_id)}
                                ></ion-icon>
                            </span>
                        );
                    })}
                    <input
                        ref={input}
                        onChange={handleTyping}
                        type="text"
                        id="search"
                        className="search-bar chat-search"
                        placeholder="Search for users"
                    />
                </div>
                <hr />
                <div className="users">
                    {users.map((user) => {
                        const { _id, photoUrl, firstName, lastName, userName } =
                            user;

                        return (
                            <div
                                key={_id}
                                className="user"
                                onClick={() => selectUser(user)}
                            >
                                <img src={photoUrl} alt={firstName} />
                                <span className="name">
                                    {firstName + ' ' + lastName}
                                </span>
                                <span className="username">{userName}</span>
                            </div>
                        );
                    })}
                </div>
                <button
                    className="create-chat"
                    disabled={!selectedUsers.length}
                >
                    Create Chat
                </button>
            </div>
        </main>
    );
}

export default NewChat;
