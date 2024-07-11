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
    passport.authenticate('google', { failureRedirect: "/login/failed" }),
    (req, res) => {
        if (req.authInfo.redirectHome) {
            res.redirect('/dashboard'); // redirect to home page if the user exists
        } else {
            res.redirect(process.env.CLIENT_URL); // redirect to client URL if the user is new
        }
    }
);

module.exports = router;
