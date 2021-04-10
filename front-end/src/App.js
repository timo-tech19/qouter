import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';

import { IsUserRedirect, ProtectedRoute } from './helpers/routes';

import { login } from './redux/reducers/user';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

function App() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // Check for user in localStorage
        const data = JSON.parse(localStorage.getItem('user'));
        // update redux store with found user
        if (data) {
            dispatch(login(data.user));
        } else {
            history.push('/login');
        }
    }, [dispatch, history]);

    return (
        <>
            <Switch>
                <ProtectedRoute user={user} exact path="/">
                    <Home />
                </ProtectedRoute>
                <IsUserRedirect user={user} loggedInPath="/" path="/register">
                    <Register />
                </IsUserRedirect>
                <IsUserRedirect user={user} loggedInPath="/" path="/login">
                    <Login />
                </IsUserRedirect>
            </Switch>
        </>
    );
}

export default App;
