import { useState, useEffect, useRef } from 'react';
import Quote from '../components/quote';
import User from '../components/user';
import { Axios } from '../helpers/Axios';

function Search() {
    const [search, setSearch] = useState('');
    const [type, setType] = useState('quotes');
    const [quotes, setQuotes] = useState([]);
    const [users, setUsers] = useState([]);
    const timer = useRef(null);

    const searchQuotes = async (term) => {
        if (term !== '') {
            try {
                const { data } = await Axios.post(`/quotes`, {
                    term,
                });

                setQuotes(data.data);
                // console.log(data.data);
            } catch (error) {
                alert(error.response.data.message);
                console.log(error.response.data);
            }
        }
    };

    const searchUsers = async (term) => {
        if (term !== '') {
            try {
                const { data } = await Axios.post(`/users`, {
                    term,
                });

                setUsers(data.data);
                // console.log(data.data);
            } catch (error) {
                alert(error.response.data.message);
                console.log(error.response.data);
            }
        }
    };

    useEffect(() => {
        clearTimeout(timer.current);

        if (search) {
            timer.current = setTimeout(() => {
                searchQuotes(search);
                searchUsers(search);
            }, 2000);
        }
    }, [search]);

    const handleSelect = (type) => {
        setType(type);
    };

    return (
        <main className="search">
            <h1>Search</h1>
            <hr />
            <div className="search-form">
                <input
                    type="text"
                    className="search-bar"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    placeholder="Search for users and posts"
                />
            </div>
            <ul className="tabs">
                <li
                    className={`tab ${type === 'quotes' ? 'active' : ''}`}
                    onClick={() => handleSelect('quotes')}
                >
                    Quote
                </li>
                <li
                    className={`tab ${type !== 'quotes' ? 'active' : ''}`}
                    onClick={() => handleSelect('users')}
                >
                    Users
                </li>
            </ul>

            <div className="search-results">
                {type === 'quotes' ? (
                    quotes.length ? (
                        quotes.map((quote) => {
                            return <Quote key={quote._id} {...quote} />;
                        })
                    ) : (
                        <p className="no-results">Nothing to show</p>
                    )
                ) : users.length ? (
                    users.map((user) => {
                        return <User key={user._id} {...user} />;
                    })
                ) : (
                    <p className="no-results">Nothing to show</p>
                )}
            </div>
        </main>
    );
}

export default Search;
