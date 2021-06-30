import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../redux/reducers/user';

function User({ _id, userName, photoUrl, firstName, lastName, click }) {
    const currentUser = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    return (
        <div className="user" onClick={click}>
            <div className="user__info">
                <span className="user__image">
                    <img src={photoUrl} alt="User" />
                </span>
                <span className="user__name">
                    {firstName} {lastName}
                </span>
                <span className="user__username">{userName}</span>
            </div>
            <button
                onClick={() => {
                    dispatch(followUser(_id));
                }}
                className={`${
                    currentUser.following.includes(_id) ? '' : 'btn-outline'
                }`}
            >
                {currentUser.following.includes(_id) ? 'Following' : 'Follow'}
            </button>
        </div>
    );
}

export default User;
