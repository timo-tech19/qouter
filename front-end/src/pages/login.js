import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser, loginError } from '../redux/reducers/user';

// import { Axios } from '../helpers/Axios';

function Login() {
    const [inputs, setInputs] = useState({
        nameOrEmail: '',
        password: '',
    });
    const error = useSelector((state) => state.user.error);
    const dispatch = useDispatch();

    // Show Error for 3 seconds
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(loginError(''));
            }, 3000);
        }
    }, [error, dispatch]);

    const handleTyping = ({ target: { name, value } }) => {
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if user input fields have values
        if (!inputs.nameOrEmail || !inputs.password) {
            dispatch(loginError('Please fill in all fields'));
        } else {
            dispatch(loginUser(inputs));
        }
    };

    return (
        <div className="authPage">
            <form>
                <h2>Login</h2>
                {error ? <h4>{error}</h4> : null}
                <div className="form-input">
                    <input
                        type="text"
                        name="nameOrEmail"
                        value={inputs.nameOrEmail}
                        placeholder="UserName or Email"
                        onChange={handleTyping}
                        required
                    />
                    <ion-icon name="mail-outline"></ion-icon>
                </div>
                <div className="form-input">
                    <input
                        type="password"
                        name="password"
                        value={inputs.password}
                        placeholder="Password"
                        onChange={handleTyping}
                        required
                    />
                    <ion-icon name="lock-closed-outline"></ion-icon>
                </div>

                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

export default Login;
