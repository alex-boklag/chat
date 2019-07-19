const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bodyParser = require('body-parser');
const users = require('./users.json');
const fs = require('fs');

const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
};

server.listen(5000);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(allowCrossDomain);


app.post('/login', (req, res) => {
  const userFromReq = req.body;
  const userInDB = users.find(user => user.name === userFromReq.name);
  if (userInDB && userInDB.password === userFromReq.password) {
    const token = jwt.sign(userFromReq, 'someSecret');
    res.status(200).json({ auth: true, token });
  } else {
    res.status(401).json({ auth: false });
  }
});


app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'users.json'));
});

app.post('/user', (req, res) => {
  let newUser = req.body;

  if (newUser) {
    let allUsers = fs.readFileSync("users.json");
    allUsers = JSON.parse(allUsers);
    for (let curr = 0; curr < allUsers.length; curr++) {
      if (newUser.id === allUsers[curr].id) {
        res.status(400).send("User with this ID already exists!");
        return;
      }
    }
    allUsers.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(allUsers));
    res.send('The user was created and added to a list of other users.');
  }
  res.status(400).send("The user wasn't created!");
});

app.get('/user/:id', (req, res) => {
  let allUsers = fs.readFileSync("users.json");
  allUsers = JSON.parse(allUsers);
  allUsers.forEach((user) => {
    if (user.id === req.params.id) {
      res.send(user);
    }
  });
  res.status(404).send("The user wasn't found!");
});

app.put('/user/:id', (req, res) => {
  const data = req.body;

  if (isFinite(req.params.id) && data) {
    let allUsers = fs.readFileSync("users.json");
    allUsers = JSON.parse(allUsers);
    allUsers.forEach((user) => {
      if (user.id === req.params.id) {
        for (let key in user) {
          user[key] = data[key] || user[key];
        }
        fs.writeFileSync("users.json", JSON.stringify(allUsers));
        res.send('The user was updated.');
      }
    });
  }
  res.status(404).send("The user doesn't exist!");
});

app.delete('/user/:id', (req, res) => {
  if (isFinite(req.params.id)) {
    let allUsers = fs.readFileSync("users.json");
    allUsers = JSON.parse(allUsers);
    allUsers.forEach((curUser, index) => {
      if (curUser.id === req.params.id) {
        allUsers.splice(index, 1);
        fs.writeFileSync("users.json", JSON.stringify(allUsers));
        res.send('The user was deleted.');
      }
    });
  }
  res.status(404).send("The user doesn't exist!");
});


app.get('/messages', (req, res) => {
  res.sendFile(path.join(__dirname, 'listOfMessages.json'));
});

app.put('/likes/:id', (req, res) => {
  const data = req.body;
  if (isFinite(req.params.id) && data) {
    let allMessages = fs.readFileSync("listOfMessages.json");
    allMessages = JSON.parse(allMessages);
    allMessages.forEach((curMessage) => {
      if (curMessage.id === req.params.id) {
        curMessage.likes += 1;
        fs.writeFileSync("listOfMessages.json", JSON.stringify(allMessages));
        res.send('The message was edited.');
      }
    });
  }
});

app.post('/message', (req, res) => {
  let newMessage = req.body;
  if (newMessage) {
    let allMessages = fs.readFileSync("listOfMessages.json");
    allMessages = JSON.parse(allMessages);
    for (let curr = 0; curr < allMessages.length; curr++) {
      if (newMessage.id === allMessages[curr].id) {
        res.status(400).send("Message with this ID already exists!");
        return;
      }
    }
    allMessages.push(newMessage);
    fs.writeFileSync("listOfMessages.json", JSON.stringify(allMessages));
    res.send('The message was created and added to a list of other messages.');
  }
  res.status(400).send("The user wasn't created!");
});

app.get('/message/:id', (req, res) => {
  let allMessages = fs.readFileSync("listOfMessages.json");
  allMessages = JSON.parse(allMessages);
  allMessages.forEach((message) => {
    if (message.id === req.params.id) {
      res.send(message);
    }
  });
  res.status(404).send("The message wasn't found!");
});

app.put('/message/:id', (req, res) => {
  const data = req.body;
  if (isFinite(req.params.id) && data) {
    let allMessages = fs.readFileSync("listOfMessages.json");
    allMessages = JSON.parse(allMessages);
    allMessages.forEach((curMessage) => {
      if (curMessage.id === req.params.id) {
        curMessage.message = data.message;
        fs.writeFileSync("listOfMessages.json", JSON.stringify(allMessages));
        res.send('The message was edited.');
      }
    });
  }
  res.status(404).send("The message doesn't exist!");
});

app.delete('/message/:id', (req, res) => {
  if (isFinite(req.params.id)) {
    let allMessages = fs.readFileSync("listOfMessages.json");
    allMessages = JSON.parse(allMessages);
    allMessages.forEach((curMessage, index) => {
      if (curMessage.id === req.params.id) {
        allMessages.splice(index, 1);
        fs.writeFileSync("listOfMessages.json", JSON.stringify(allMessages));
        res.send('The message was deleted.');
      }
    });
  }
  res.status(404).send("The message doesn't exist!");
});