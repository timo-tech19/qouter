import './main.scss';

import Post from '../../components/post';
import Quotes from '../../components/quotes';

function Main() {
    return (
        <main>
            <h1>Home</h1>
            <hr />
            <Post />
            <Quotes />
        </main>
    );
}

export default Main;
