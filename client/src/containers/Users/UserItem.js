import React from "react";

const UserItem = (props) => {
    const { id, name, surname, email } = props;
    return (
        <div className="container list-group-item">
            <div className="row">
                <div className="col-8">
                    <span className="badge badge-secondary float-left" style={{ fontSize: "2em", margin: "2px" }}>{name} {surname}</span>
                    <span className="badge badge-info" style={{ fontSize: "2em", margin: "2px" }}>{email}</span>
                </div>
                <div className="col-4 btn-group">
                    <button className="btn btn-outline-primary" onClick={(e) => props.onUpdate(id)}> Edit </button>
                    <button className="btn btn-outline-dark" onClick={(e) => props.onDelete(id)}> Delete </button>
                </div>
            </div>
        </div>
    );
};

export default UserItem;