import { Link } from 'react-router-dom';
import { Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProtectedRoute } from '../helpers/routes';

import { logout } from '../redux/reducers/user';

import Main from '../containers/main';
import QuoteContainer from '../containers/quote';
import Profile from '../containers/profile';
import Search from '../containers/search';
import Chats from '../containers/chats';
import NewChat from '../containers/newChat';

function Home() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const logoutHandler = () => {
        localStorage.removeItem('user');
        dispatch(logout());
        history.push('/login');
    };

    return (
        <div className="homepage">
            <div className="navContainer">
                <nav>
                    <ul>
                        <li className="logo">
                            <Link to="/">
                                <ion-icon name="snow"></ion-icon>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <ion-icon name="home-outline"></ion-icon>
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                <ion-icon name="search-outline"></ion-icon>
                            </Link>
                        </li>
                        <li>
                            <Link to="/notifications">
                                <ion-icon name="notifications-outline"></ion-icon>
                            </Link>
                        </li>
                        <li>
                            <Link to="/chats">
                                <ion-icon name="chatbox-outline"></ion-icon>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <ion-icon name="person-outline"></ion-icon>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={logoutHandler} to="#">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Switch>
                <ProtectedRoute user={user} exact path="/new-chat">
                    <NewChat />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path="/chats">
                    <Chats />
                </ProtectedRoute>
                <ProtectedRoute user={user} exact path="/search">
                    <Search />
                </ProtectedRoute>
                {/* For other users */}
                <ProtectedRoute user={user} exact path="/profile/:userName">
                    <Profile activeUser={user} />
                </ProtectedRoute>
                {/* For active user */}
                <ProtectedRoute user={user} exact path="/profile">
                    <Profile profileUser={user} />
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
