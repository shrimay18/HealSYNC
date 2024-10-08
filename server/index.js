const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const passport = require("passport");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth");
const SignUpRoutes = require("./Routes/SignUpRoute");
const LoginRoutes = require("./Routes/LoginRoute");
const dashBoardRoutes = require("./Routes/DashBoardRoute");
const hospitalDashRoutes = require("./Routes/hospitalDashRoute");
const patientPastHistoryRoutes = require("./Routes/patientHistoryRoutes");

const port = process.env.PORT || 3000;


require('./passport');

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log("Connection failed!");
        console.log(err);
    });
 
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

app.use("/signup", SignUpRoutes);
app.use("/login", LoginRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dashBoardRoutes);
app.use("/hospital", hospitalDashRoutes);
app.use("/patientHistory", patientPastHistoryRoutes);
app.use("/notes", require("./Routes/doctorNoteRoutes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    console.log("Hello World");
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.send("Hello World");
});