import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { toggleModal } from '../redux/reducers/modal';
import { login } from '../redux/reducers/user';
import { useParams, useHistory } from 'react-router-dom';
import Qoute from '../components/quote';
import { Axios } from '../helpers/Axios';
import Modal from '../components/modal';
import { readURL } from '../helpers/functions';
// import ImageCrop from '../components/imageCrop';

function Profile({ profileUser, activeUser }) {
    const [quotes, setQuotes] = useState([]);
    const [user, setUser] = useState(null);
    const [src, setSrc] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const { userName } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    // const activeUser = useSelector((state) => state.user);
    const modal = useSelector((state) => state.modal);

    const uploadRef = useRef(null);
    const cropperRef = useRef(null);

    const onCrop = () => {
        const imageElement = cropperRef.current;
        const cropper = imageElement.cropper;
        // console.log(cropper.getCroppedCanvas().toDataURL());
        cropper.getCroppedCanvas().toBlob((blob) => setCroppedImage(blob));
    };

    const upload = async () => {
        const formData = new FormData();
        // formData.append('name', 'photo');
        formData.append('userPhoto', croppedImage);
        try {
            const { data } = await Axios({
                url: `/users/${profileUser._id}/upload-photo`,
                method: 'patch',
                data: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            setUser(data.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleFollow = async () => {
        try {
            const { data } = await Axios.patch(`/users/${user._id}/follow`);
            console.log(data);
            dispatch(login(data.data.updatedActiveUser));
            setUser(data.data.updatedUser);
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async (user, activeUser) => {
        if (user) {
            return setUser(user);
        }

        const { data } = await Axios.get(`/users/${userName}`);
        // console.log(data);
        if (data.data._id === activeUser._id) history.push('/profile');
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
        if (modal) readURL(uploadRef.current, setSrc);
    });

    useEffect(() => {
        getUser(profileUser, activeUser);
        getQuotes();

        // Performance issue
    });
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
                            {profileUser ? (
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
                            {profileUser ? (
                                <button>Edit Profile</button>
                            ) : (
                                <>
                                    <button className="message-button">
                                        <ion-icon name="mail-outline"></ion-icon>
                                    </button>
                                    <button
                                        className="follow-button"
                                        onClick={handleFollow}
                                    >
                                        {activeUser
                                            ? activeUser.following.includes(
                                                  user._id
                                              )
                                                ? 'Following'
                                                : 'Follow'
                                            : profileUser.following.includes(
                                                  user._id
                                              )
                                            ? 'Following'
                                            : 'Follow'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </header>
            ) : null}
            {modal ? (
                <Modal done={upload}>
                    <input type="file" ref={uploadRef} name="photo" />
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
                    <Qoute key={quote._id} {...quote} />
                ))}
            </div>
        </main>
    );
}

export default Profile;
