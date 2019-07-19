import React from 'react';
import like from '../../../assets/like.png';
import './Message.css';

const Message = (props) => {
    const { id, avatar, created_at, message, className } = props;
    if (className === 'left') {
        return (
            <div className={'message-card ' + className}>
                <img className="avatar" src={avatar} alt="avatar" />
                <div className="info">
                    <p>{created_at}</p>
                    <p className="message">{message}</p>
                    <p className="like">
                        <img src={like} alt="like" />
                        <span>1</span>
                    </p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={'message-card ' + className}>
                <div className="info">
                    <p>{created_at}</p>
                    <p className="message">{message}</p>
                    <p className="like">
                        <img src={like} alt="like" />
                        <span>1</span>
                    </p>
                    <button className="btn btn-outline-primary" onClick={() => props.onEdit(id)}>Edit</button>
                    <button className="btn btn-outline-dark" onClick={() => props.onDelete(id)}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Message;