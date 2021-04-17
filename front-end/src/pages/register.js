import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../redux/reducers/user';
import { Axios } from '../helpers/Axios';

function Register() {
    // Internal Register component states
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        confirmPassword: '',
        password: '',
    });
    const [error, setError] = useState('');
    const {
        firstName,
        lastName,
        userName,
        email,
        confirmPassword,
        password,
    } = inputs;

    const dispatch = useDispatch();

    const handleTyping = ({ target: { name, value } }) => {
        setInputs({ ...inputs, [name]: value });
    };

    const sendInputs = async (inputs) => {
        try {
            const response = await Axios({
                method: 'post',
                url: '/users/register',
                data: inputs,
            });

            if (response.status !== 201) {
                throw new Error(response.data);
            }
            const { data } = response.data;
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(login(data.user));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !firstName ||
            !lastName ||
            !userName ||
            !email ||
            !confirmPassword ||
            !password
        ) {
            setError('Please fill in all fields');
        } else {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
            } else {
                setError('');
                sendInputs(inputs);
            }
        }
    };

    return (
        <div className="authPage">
            <form>
                <h2>Register</h2>
                {error ? <h4>{error}</h4> : null}
                <div className="form-input">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleTyping}
                        required
                    />
                    <ion-icon name="person-outline"></ion-icon>
                </div>

                <div className="form-input">
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={handleTyping}
                        required
                    />
                    <ion-icon name="person-outline"></ion-icon>
                </div>

                <div className="form-input">
                    <input
                        type="text"
                        name="userName"
                        value={userName}
                        placeholder="User Name"
                        onChange={handleTyping}
                        required
                    />
                    <ion-icon name="person-outline"></ion-icon>
                </div>
                <div className="form-input">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={handleTyping}
                        required
                    />
                    <ion-icon name="mail-outline"></ion-icon>
                </div>
                <div className="form-input">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleTyping}
                        required
                    />
                    <ion-icon name="lock-closed-outline"></ion-icon>
                </div>

                <div className="form-input">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={handleTyping}
                        required
                    />
                    <ion-icon name="lock-closed-outline"></ion-icon>
                </div>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
                <button onClick={handleSubmit}>Register</button>
            </form>
        </div>
    );
}

export default Register;
