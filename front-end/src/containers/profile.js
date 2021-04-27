import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Qoute from '../components/quote';
import { Axios } from '../helpers/Axios';

function Profile({ profileUser }) {
    const [quotes, setQuotes] = useState([]);
    const [user, setUser] = useState(null);
    const { userName } = useParams();
    // const user = { ...profileUser };

    // if(!profileUser) {

    // }

    const getUser = async (user) => {
        if (user) {
            return setUser(user);
        }

        const { data } = await Axios.get(`/users/${userName}`);
        console.log(data);
        return setUser(data.data);
    };

    const getQuotes = async () => {
        try {
            const { data } = await Axios.get(`/users/${user._id}/quotes`);
            if (data) {
                setQuotes(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser(profileUser);
        getQuotes();
    }, [user]);

    return (
        <main className="profile">
            <h1>Profile</h1>
            <hr />
            {user ? (
                <header className="profile-header">
                    <div className="profile-images">
                        <div className="cover-image">
                            <img src={user.coverPhotoUrl} alt="Profile Cover" />
                        </div>
                        <div className="user-image">
                            <img src={user.photoUrl} alt="User" />
                        </div>
                    </div>
                    <div className="profile-details">
                        <div className="user-details">
                            <p className="user-fullname">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="username">@{user.userName}</p>
                            <p>
                                <span>
                                    <i>0</i> followers
                                </span>{' '}
                                <span>
                                    <i>0</i> following
                                </span>
                            </p>
                        </div>
                        <div className="user-actions">
                            <button className="message-button">
                                <ion-icon name="mail-outline"></ion-icon>
                            </button>
                            <button className="follow-button">Follow</button>
                        </div>
                    </div>
                </header>
            ) : null}

            <div className="quotes-container">
                {quotes.map((quote) => (
                    <Qoute key={quote._id} {...quote} />
                ))}
            </div>
        </main>
    );
}

export default Profile;
