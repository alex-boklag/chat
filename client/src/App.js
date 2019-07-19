import React from 'react';
import './App.css';
import Login from './containers/Login/Login';
import Chat from './containers/Chat/Chat';
import MessagePage from './containers/MessagePage/MessagePage';
import UserPage from './containers/UserPage/UserPage';
import Users from './containers/Users/Users';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/chat" component={Chat} />
        <Route path="/message/:id" component={MessagePage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/user" component={UserPage} />
        <Route path="/user/:id" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;