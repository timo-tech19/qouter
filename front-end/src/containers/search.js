function Search() {
    return (
        <main className="search">
            <h1>Search</h1>
            <hr />
            <div className="search-form">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search for users and posts"
                />
            </div>
            <ul className="tabs">
                <li className="tab active">Posts</li>
                <li className="tab">Users</li>
            </ul>
        </main>
    );
}

export default Search;
