const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const app = express();

app.use(cors());

/* Body parser middleware to parse request body JSON */
app.use(express.json());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : '5433',
    user : 'jordan',
    password : '',
    database : 'smartbrain'
  }
});

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, bcrypt, db) });
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(3000, () => {
  console.log('App is running on port 3000');
})