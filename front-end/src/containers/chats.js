import { useHistory } from 'react-router-dom';

function Chats() {
    const history = useHistory();
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
