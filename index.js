require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const personRoute = require('./routes/person-route');
const authRoute = require('./routes/auth-route');

var constants = require('./constants/main/index');

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use('/person', personRoute);
app.use('/auth', authRoute);

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@apicluster.ja5ll83.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(constants.PORT)
    })
    .catch((err) => console.log(err))

