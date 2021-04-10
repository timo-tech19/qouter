import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../redux/reducers/user';

import { Axios } from '../helpers/Axios';

function Login() {
    const [inputs, setInputs] = useState({
        nameOrEmail: '',
        password: '',
    });
    const [error, setError] = useState('');

    // Show Error for 3 seconds
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }, [error]);

    const dispatch = useDispatch();

    const handleTyping = ({ target: { name, value } }) => {
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputs.nameOrEmail || !inputs.password) {
            setError('Please fill in all fields');
        } else {
            sendInputs(inputs);
            setError('');
        }
    };

    const sendInputs = async (inputs) => {
        try {
            const response = await Axios({
                method: 'post',
                url: '/users/login',
                data: inputs,
            });

            if (response.status !== 200) {
                throw new Error(response.data);
            }
            const { data } = response.data;
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(login(data.user));
        } catch (error) {
            setError(error.response.data.message);
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
                    <i className="far fa-user"></i>
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
                    <i className="fas fa-lock"></i>
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
