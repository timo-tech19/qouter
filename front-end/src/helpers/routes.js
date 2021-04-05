import { Route, Redirect } from 'react-router-dom';

export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
    return (
        <Route {...rest}>
            {user ? (
                <Redirect
                    to={{
                        pathname: loggedInPath,
                    }}
                ></Redirect>
            ) : (
                children
            )}
        </Route>
    );
}

export function ProtectedRoute({ user, children, ...rest }) {
    return (
        <Route {...rest}>
            {user ? (
                children
            ) : (
                <Redirect
                    to={{ pathname: 'login', state: { from: 'location' } }}
                ></Redirect>
            )}
        </Route>
    );
}
