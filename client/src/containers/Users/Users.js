import React, { Component } from "react";
import { connect } from 'react-redux';
import UserItem from './UserItem';
import * as actions from './actions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    onAdd() {
        this.props.history.push('/user');
    }

    onUpdate(id) {
        this.props.history.push(`/user/${id}`);
    }

    onDelete(id) {
        this.props.deleteUser(id);
    }

    render() {
        return (
            <div className="row">
                <div className="list-group col-12">
                    {
                        this.props.users.map(user => {
                            return (
                                <UserItem
                                    key={user.id}
                                    id={user.id}
                                    name={user.name}
                                    surname={user.surname}
                                    email={user.email}
                                    onUpdate={this.onUpdate}
                                    onDelete={this.onDelete}
                                />
                            );
                        })
                    }
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={this.onAdd}
                        style={{ margin: "20px" }}
                    >
                        Add user
					</button>
                </div>
                <div className="col-12">
                    <Link
                        to='/chat'
                    >
                        Chat
                    </Link>
                </div>
            </div>
        );
    }
}

UserList.propTypes = {
    userData: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);