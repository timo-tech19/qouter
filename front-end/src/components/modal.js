import { useDispatch } from 'react-redux';
import { toggleModal } from '../redux/reducers/modal';

function Modal({ children, done }) {
    const dispatch = useDispatch();
    return (
        <div className={`backdrop`}>
            <div className="modal">
                <button
                    className="close"
                    onClick={() => dispatch(toggleModal(false))}
                >
                    X
                </button>
                <div className="content">
                    {children || 'place content in here'}
                </div>
                <div className="actions">
                    <button onClick={done}>Done</button>
                    <button onClick={() => dispatch(toggleModal(false))}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
