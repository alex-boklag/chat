import React from 'react';
import Header from '../../components/Header/Header';
import MessageList from '../../components/MessageList/MessageList';
import MessageInput from '../../components/MessageInput/MessageInput';
import './Chat.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './actions';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onLike = this.onLike.bind(this);
    }

    componentDidMount() {
        this.props.fetchMessages();
    }

    onAdd(message) {
        this.props.addMessage(message);
    }

    onEdit(id) {
        this.props.history.push(`/message/${id}`);
    }

    onDelete(id) {
        this.props.deleteMessage(id);
    }

    onLike(id) {
        this.props.likeMessage(id);
    }

    render() {
        return (
            <div className="chat">
                <Header
                    listOfMessages={this.props.listOfMessages}
                />
                <MessageList
                    listOfMessages={this.props.listOfMessages}
                    onEdit={this.onEdit}
                    onDelete={this.onDelete}
                    onLike={this.onLike}
                />
                <MessageInput
                    onAdd={this.onAdd}
                />
            </div>
        )
    }
}

Chat.propTypes = {
    messageData: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        listOfMessages: state.chat
    }
};

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);