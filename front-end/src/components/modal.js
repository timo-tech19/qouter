import React from 'react';

function Modal({ children }) {
    return (
        <div className="backdrop">
            <div className="modal">
                <button className="close">X</button>
                <div className="content">
                    {children || 'place content in here'}
                </div>
                <div className="actions">
                    <button>Done</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
