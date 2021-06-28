import { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory, Route } from 'react-router-dom';

import { IsUserRedirect, ProtectedRoute } from './helpers/routes';

// import { login } from './redux/reducers/user';
import { Axios } from './helpers/Axios';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { login } from './redux/reducers/user';

function App() {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const history = useHistory();
    let token = useRef(null);

    useEffect(() => {
        // Check for user in localStorage
        token.current = JSON.parse(localStorage.getItem('userToken'));
        // update redux store with found user
        if (token) {
            authorizeUser();
        } else {
            history.push('/login');
        }
    });

    const authorizeUser = async () => {
        try {
            const { data } = await Axios({
                method: 'post',
                url: '/auth/authorize-user',
            });

            dispatch(login(data.data));
        } catch (error) {}
    };

    return (
        <>
            {token.current ? (
                <Switch>
                    <IsUserRedirect
                        user={user}
                        loggedInPath="/"
                        path="/register"
                    >
                        <Register />
                    </IsUserRedirect>
                    <IsUserRedirect user={user} loggedInPath="/" path="/login">
                        <Login />
                    </IsUserRedirect>
                    <ProtectedRoute user={user} path="/">
                        <Home />
                    </ProtectedRoute>
                    <Route path="*">
                        <h1>404: Page not Found</h1>
                    </Route>
                </Switch>
            ) : null}
        </>
    );
}

export default App;
