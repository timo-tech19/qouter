import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ProtectedRoute } from '../helpers/routes';

import Main from '../containers/main';
import QuoteContainer from '../containers/quote';
import Profile from '../containers/profile';
import Search from '../containers/search';
import Chats from '../containers/chats';
import NewChat from '../containers/newChat';
import Navbar from '../components/navbar';
import Chat from '../containers/chat';

function Home() {
    const user = useSelector((state) => state.user.data);

    return (
        <div className="homepage">
            <Navbar />
            <Switch>
                <ProtectedRoute user={user} exact path="/chats/:chatId">
                    <Chat />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path="/new-chat">
                    <NewChat activeUser={user} />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path="/chats">
                    <Chats />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path="/search">
                    <Search />
                </ProtectedRoute>
                {/* For other users */}
                <ProtectedRoute user={user} exact path="/profile/:userName">
                    <Profile />
                </ProtectedRoute>
                {/* For active user */}
                <ProtectedRoute user={user} exact path="/profile">
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path="/quote/:quoteId">
                    <QuoteContainer />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path="/">
                    <Main />
                </ProtectedRoute>
            </Switch>

            <aside>
                {user.firstName} {user.lastName}
            </aside>
        </div>
    );
}

export default Home;
