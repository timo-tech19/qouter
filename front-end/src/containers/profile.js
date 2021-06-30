import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { toggleModal } from '../redux/reducers/modal';
import { followUser, updateUserPhoto } from '../redux/reducers/user';

import Quote from '../components/quote';
import Modal from '../components/modal';
import { readURL } from '../helpers/functions';
import { Axios } from '../helpers/Axios';

function Profile() {
    const match = useRouteMatch();
    const [quotes, setQuotes] = useState([]);
    const [user, setUser] = useState(null);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [src, setSrc] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const { userName } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector((state) => state.user.data);
    const modal = useSelector((state) => state.modal);

    const uploadRef = useRef(null);
    const cropperRef = useRef(null);

    const onCrop = () => {
        const imageElement = cropperRef.current;
        const cropper = imageElement.cropper;
        cropper.getCroppedCanvas().toBlob((blob) => setCroppedImage(blob));
    };

    const getUser = async (username) => {
        const { data } = await Axios.get(`/users/${username}`);
        return setUser(data.data);
    };

    useEffect(() => {
        if (match.path === '/profile') {
            setUser(currentUser);
            setIsCurrentUser(true);
        } else {
            if (userName === currentUser.userName)
                return history.push('/profile');

            getUser(userName);
            setIsCurrentUser(false);
        }
    }, [currentUser, match.path, userName, history]);

    useEffect(() => {
        const getQuotes = async () => {
            try {
                const { data } = await Axios.get(`/users/${user._id}/quotes`);
                if (data) setQuotes(data.data);
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message);
                    console.log(error.response);
                } else {
                    console.log(error);
                }
            }
        };
        if (user) getQuotes();
    }, [user]);

    const handleSelectFile = () => {
        if (modal) readURL(uploadRef.current, setSrc);
    };

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
                            {isCurrentUser ? (
                                <button
                                    onClick={() => dispatch(toggleModal(true))}
                                >
                                    <ion-icon name="camera-reverse-outline"></ion-icon>
                                </button>
                            ) : null}
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
                                    <i>{user.followers.length}</i> followers
                                </span>{' '}
                                <span>
                                    <i>{user.following.length}</i> following
                                </span>
                            </p>
                        </div>
                        <div className="user-actions">
                            {isCurrentUser ? (
                                <button>Edit Profile</button>
                            ) : (
                                <>
                                    <button className="message-button">
                                        <ion-icon name="mail-outline"></ion-icon>
                                    </button>
                                    {isCurrentUser ? (
                                        <button className="edit-profile-button">
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                dispatch(followUser(user._id));
                                            }}
                                        >
                                            {currentUser.following.includes(
                                                user._id
                                            )
                                                ? 'Following'
                                                : 'Follow'}
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>
            ) : null}

            {modal ? (
                <Modal
                    done={() =>
                        dispatch(updateUserPhoto(user._id, croppedImage))
                    }
                >
                    <input
                        type="file"
                        ref={uploadRef}
                        name="photo"
                        onChange={handleSelectFile}
                    />
                    <div className="preview">
                        <Cropper
                            src={src}
                            style={{ height: 300, width: '70%' }}
                            initialAspectRatio={1 / 1}
                            guides={false}
                            crop={onCrop}
                            ref={cropperRef}
                        />
                    </div>
                </Modal>
            ) : null}
            <div className="quotes-container">
                {quotes.map((quote) => (
                    <Quote key={quote._id} {...quote} />
                ))}
            </div>
        </main>
    );
}

export default Profile;
