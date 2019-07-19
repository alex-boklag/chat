import React from 'react';
import './MessageList.css';
import Message from './Message/Message';

const MessageList = (props) => {
    return (
        <div className="message-list">
            {
                props.listOfMessages.map(curMessage => {
                    const { id, user, avatar, created_at, message, marked_read, likes, className } = curMessage;
                    return (
                        <Message
                            key={id}
                            id={id}
                            user={user}
                            avatar={avatar}
                            created_at={created_at}
                            message={message}
                            marked_read={marked_read}
                            likes={likes}
                            className={className || 'left'}
                            onLike={props.onLike}
                            onEdit={props.onEdit}
                            onDelete={props.onDelete}
                        />
                    )
                })
            }
        </div>
    )
}

export default MessageList;