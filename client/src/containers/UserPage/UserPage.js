import React, { Component } from "react";
import { connect } from 'react-redux'
import * as actions from './actions';
import { addUser, updateUser } from '../Users/actions';
import TextInput from '../../shared/inputs/text/TextInput';
import PasswordInput from '../../shared/inputs/password/PasswordInput';
import EmailInput from '../../shared/inputs/email/EmailInput';
import userFormConfig from '../../shared/config/userFormConfig';
import defaultUserConfig from '../../shared/config/defaultUserConfig';
import PropTypes from 'prop-types';
const EMAIL = "email";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.getDefaultUserData();
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchUser(this.props.match.params.id)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.userData.id !== prevState.id && nextProps.match.params.id) {
            return {
                ...nextProps.userData
            };
        } else {
            return null;
        }
    }

    onCancel() {
        this.setState(this.getDefaultUserData());
        this.props.history.push('/users');
    }

    onSave() {
        if (this.state.id) {
            this.props.updateUser(this.state.id, this.state);
        } else {
            this.props.addUser(this.state);
        }
        this.setState(this.getDefaultUserData());
        this.props.history.push('/users');
    }

    onChangeData(e, keyword) {
        const value = e.target.value;
        this.setState(
            {
                ...this.state,
                [keyword]: value
            }
        );
    }

    getDefaultUserData() {
        return {
            ...defaultUserConfig
        };
    }

    getInput(data, { label, type, keyword }, index) {
        switch (type) {
            case 'text':
                return (
                    <TextInput
                        key={index}
                        label={label}
                        type={type}
                        text={data[keyword]}
                        keyword={keyword}
                        onChange={this.onChangeData}
                    />
                );
            case 'email':
                return (
                    <EmailInput
                        key={index}
                        label={label}
                        type={type}
                        text={data[keyword]}
                        keyword={keyword}
                        ref={EMAIL}
                        onChange={this.onChangeData}
                    />
                );
            case 'password':
                return (
                    <PasswordInput
                        key={index}
                        label={label}
                        type={type}
                        text={data[keyword]}
                        keyword={keyword}
                        onChange={this.onChangeData}
                    />
                );
            default:
                return null;
        }
    }

    render() {
        const data = this.state;

        return (
            <div className="modal" style={{ display: "block" }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{ padding: "5px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add user</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                userFormConfig.map((item, index) => this.getInput(data, item, index))
                            }
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.onSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserPage.propTypes = {
    userData: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        userData: state.userPage.userData
    }
};

const mapDispatchToProps = {
    ...actions,
    addUser,
    updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);