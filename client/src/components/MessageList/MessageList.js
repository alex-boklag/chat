import React from 'react';
import './MessageList.css';
import Message from './Message/Message';

const MessageList = (props) => {
    return (
        <div className="message-list">
            {
                props.listOfMessages.map(curMessage => {
                    const { id, user, avatar, created_at, message, marked_read, className } = curMessage;
                    return (
                        <Message
                            key={id}
                            id={id}
                            user={user}
                            avatar={avatar}
                            created_at={created_at}
                            message={message}
                            marked_read={marked_read}
                            className={className || 'left'}
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