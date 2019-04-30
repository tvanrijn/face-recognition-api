const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const database = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('Getting root');
})

app.post('/signin', (req, res) => {
    signin.handleSignin(
        req,
        res,
        database,
        bcrypt
    )
})

app.post('/register', (req, res) => { 
    register.handleRegister(
        req, 
        res, 
        database, 
        bcrypt
    ) 
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(
        req,
        res,
        database
    )
})

app.put('/image', (req, res) => {
    image.handleImage(
        req,
        res,
        database
    )
})

app.post('/imageurl', (req, res) => {
    image.handleClarifai(
        req,
        res    
    )
})

const PORT = process.env.PORT;
app.listen(PORT || 3000, ()=> {
    console.log(`App is running on port ${PORT}`);
});