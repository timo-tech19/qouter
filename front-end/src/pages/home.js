import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../redux/reducers/user';

import Main from '../containers/main';

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
                            <Link to="/messages">
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

            <Main />
            <aside>
                {user.firstName} {user.lastName}
            </aside>
        </div>
    );
}

export default Home;
