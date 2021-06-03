import React, { useState } from 'react';

function NewChat() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleTyping = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <main className="new-chat">
            <h1>New Chat</h1>
            <hr />
            <div className="chat-details">
                <div className="search-form">
                    <label htmlFor="search">To: </label>
                    <input
                        onChange={handleTyping}
                        type="text"
                        id="search"
                        className="search-bar chat-search"
                        placeholder="Search for users"
                    />
                </div>
                <hr />
                <button className="create-chat" disabled={!searchTerm}>
                    Create Chat
                </button>
            </div>
        </main>
    );
}

export default NewChat;
