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
    passport.authenticate('google', { failureRedirect: "/login/failed",  successRedirect: "/login/success"}),
    (req, res) => {
        console.log('Session before:', req.session); // Log the session before updating
        req.session.googleUser = {
            name: req.user.name,
            email: req.user.email
        };
        console.log('Session after:', req.session); // Log the session after updating
        // ...
        if (req.authInfo.redirectHome) {
            res.redirect('/dashboard'); // redirect to home page if the user exists
        } else {
            res.redirect(process.env.CLIENT_URL); // redirect to client URL if the user is new
        }
    }
);
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username, email:user.email, name: user.name});
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});
module.exports = router;
