import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/reducers/user';

function Navbar() {
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        localStorage.removeItem('userToken');
        dispatch(logout());
        history.push('/login');
    };

    return (
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
    );
}

export default Navbar;
