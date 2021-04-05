import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { login } from '../../redux/reducers/user';

import './login.scss';

function Login() {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        nameOrEmail: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleTyping = ({ target: { name, value } }) => {
        setInputs({ ...inputs, [name]: value });
    };

    const sendInputs = async (inputs) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/v1/users/login',
                data: inputs,
            });

            if (response.status !== 200) {
                throw new Error(response.data);
            }
            const { data } = response.data;
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(login(data.user));
        } catch (error) {
            console.log({ ...error });
        }
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
