const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const passport = require("passport");
// const cookieSession = require("express-session");
const expressSession = require("express-session");
const passportSetup = require("./passport");
const authRoutes = require("./Routes/auth");

const logInCollection = require('./mongo.js');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// allow cors for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// cors. allow all origins
// cors.origin = '*';

// default route
app.get('', (req, res) => {
    res.send('Hello World');
});

app.get('/users', async (req, res) => {

    res.send("Users");
});


app.post('/signup', async (req, res) => {
    console.log("Received request:", req.body);
    const data = {
        username: req.body.username, // Use "Username" to match the client-side expectation
        password: req.body.password,
    };
    console.log("Received data:", data); // Log incoming data

    try {
        const checking = await logInCollection.findOne({ username: data.username });
        console.log("Existing user:", checking);

        if (checking) {
            res.status(409).send('User already exists'); // Conflict status code for existing user
        } else {
            await logInCollection.insertMany([data]);
            res.status(201).send('User created'); // Created status code for successful insertion
        }
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send('Internal Server Error'); // Internal server error for any other issues
    }
});

app.post('/login', async (req, res) => {
    console.log("Received request:", req);
    try {
        console.log("Received request:", req.body);
        const data = {
            username: req.body.username, // Use "Username" to match the client-side expectation
            password: req.body.password,
        };
        console.log("Received data:", data); // Log incoming data

        const user = await logInCollection.findOne({ username: data.username, password: data.password });
        console.log("User found:", user);

        if (user) {
            res.send('Logged in');
        } else {
            res.status(401).send('No user found');
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send('Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// gAuth


app.use(
    expressSession({
        secret: "cyberwolve",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(
    // cors({
    //     origin: "http://localhost:3001/",
    //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     credentials: true,
    // })
// );

app.use("/auth", authRoutes);