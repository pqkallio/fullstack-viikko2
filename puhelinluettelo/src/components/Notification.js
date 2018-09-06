import React from 'react';

const Notification = ({ type, message }) => {
    if (!(type && message)) {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    );
};

export default Notification;