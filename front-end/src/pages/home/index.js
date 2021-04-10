import { Link } from 'react-router-dom';
import Main from '../../containers/main';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/reducers/user';

import './home.scss';

function Home() {
    const history = useHistory();
    const dispatch = useDispatch();

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
                                <i className="fas fa-feather-alt"></i>{' '}
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="fas fa-home"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                <i className="fas fa-search"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/notifications">
                                <i className="fas fa-bell"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/messages">
                                <i className="fas fa-envelope"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <i className="fas fa-user"></i>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={logoutHandler} to="#">
                                <i className="fas fa-sign-out-alt"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <Main />
            <aside>Side Bar</aside>
        </div>
    );
}

export default Home;
