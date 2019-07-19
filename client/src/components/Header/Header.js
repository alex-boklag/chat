import React from 'react';
import './Header.css';

const Header = (props) => {

    function unique(arr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i].user;
            obj[str] = true;
        }
        return Object.keys(obj);
    }

    const listOfMessages = props.listOfMessages;
    const nParticipants = unique(listOfMessages).length;
    const nMessages = listOfMessages.length;
    const lastMessageDate = listOfMessages[nMessages - 1].created_at;

    return (
        <div className="header">
            <span>My chat </span>
            <span>{nParticipants} participants </span>
            <span>{nMessages} messages </span>
            <span>last message {lastMessageDate}</span>
        </div>
    )
}

export default Header;