const router = require('express').Router();
const passport = require('passport');

router.get("/login/failed", (req, res) => {
    res.status(401).send("Login failed");
});

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).send("Login success");
    } else {
        res.status(403).send("Not Authorized");
    }
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    '/google/callback',

    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

module.exports = router;
