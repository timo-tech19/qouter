function User({ userName, photoUrl, firstName, lastName }) {
    return (
        <div className="user">
            <div className="user__info">
                <span className="user__image">
                    <img src={photoUrl} alt="User" />
                </span>
                <span className="user__name">
                    {firstName} {lastName}
                </span>
                <span className="user__username">{userName}</span>
            </div>
            <button>Follow</button>
        </div>
    );
}

export default User;
