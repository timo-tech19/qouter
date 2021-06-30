function User({ userName, photoUrl, firstName, lastName, click }) {
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
            <button>Follow</button>
        </div>
    );
}

export default User;
