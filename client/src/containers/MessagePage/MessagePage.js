import React from "react";
import { connect } from 'react-redux';
import * as actions from './actions';
import { editMessage } from '../Chat/actions';

class MessagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            message: ''
        };
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchMessage(this.props.match.params.id)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.messageData.id !== prevState.id && nextProps.match.params.id) {
            return {
                ...nextProps.messageData
            };
        } else {
            return null;
        }
    }

    onChangeData(e) {
        const value = e.target.value;
        this.setState(
            {
                ...this.state,
                message: value
            }
        );
    }

    onCancel() {
        this.props.history.push('/chat');
        this.setState({ messageText: '' });
    }

    onSave() {
        this.props.editMessage(this.state.id, this.state.message);
        this.setState({ messageText: '' });
        this.props.history.push('/chat');
    }

    render() {
        return (
            <div className="modal" style={{ display: "block" }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{ padding: "5px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit message</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                onChange={(e) => this.onChangeData(e)}
                                style={{ width: "400px", height: "200px" }}
                                value={this.state.message}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => this.onCancel()}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => this.onSave()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messageData: state.messagePage.messageData
    }
};

const mapDispatchToProps = {
    ...actions,
    editMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage);