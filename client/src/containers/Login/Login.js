import React from 'react';
import './Login.css';
import api from '../../shared/config/api';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.authentificate.bind(this);
        this.state = {
            name: '',
            password: ''
        }
        this.onChangeData.bind(this);
    }

    onChangeData(e) {
        const keyword = (e.target.className === 'login-field') ? 'name' : 'password';
        const value = e.target.value;
        this.setState({
            [keyword]: value
        });
    }

    authentificate() {
        fetch(`${api.url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password
            })
        })
            .then(res => {
                res.json().then(body => {
                    if (body.auth) {
                        localStorage.setItem('jwt', body.token);
                        if (this.state.name !== 'admin') {
                            this.props.history.push('/chat');
                        } else {
                            this.props.history.push('/users');
                        }
                    } else {
                        alert('Authentication failed. Please, try again.');
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="login">
                <input className="login-field" type="text" placeholder="Login" onChange={(e) => this.onChangeData(e)} />
                <input className="pw-field" type="password" placeholder="Password" onChange={(e) => this.onChangeData(e)} />
                <button className="btn btn-primary btn-lg" onClick={() => this.authentificate()}>Log In</button>
            </div>
        )
    }
}

export default Login;