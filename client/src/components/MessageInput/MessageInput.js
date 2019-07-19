import React from 'react';
import './MessageInput.css';

class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: '' 
        }
        this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.setState({
            newMessage: e.target.value
        })
    }

    render() {
        return (
            <div className="message-input">
                <textarea
                    className="text-message"
                    type="text"
                    placeholder="Message"
                    onChange={this.handleChange}>
                </textarea>
                <button
                    className="btn btn-primary submit-message"
                    onClick={() => this.props.onAdd(this.state.newMessage)}>Send</button>
            </div>
        )
    }
}

export default MessageInput;