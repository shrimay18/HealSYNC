const router = require('express').Router();
const passport = require('passport');
const User = require('../models/Users');
router.get("/login/failed", (req, res) => {
    res.status(401).send("Login failed");
});

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).send({
            message: "Login success",
            email: req.user.email,
            name: req.user.name,
            id: req.user.id,
            redirectHome: req.authInfo.redirectHome
        });
    } else {
        res.status(403).send("Not Authorized");
    }
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: "/login/failed" }),
    (req, res) => {
        if (req.user) {
            console.log("success redirect");
            console.log('Printing req: ', req);
            req.session.googleUser = {
                name: req.user.name,
                email: req.user.email
            };

            console.log('Printing req After: ', req);

            if (req.authInfo.redirectHome) {
                res.redirect(process.env.CLIENT_URL2);
            } else {
                res.redirect(process.env.CLIENT_URL);
            }
        } else {
            res.redirect("/login/failed");
        }
    }
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = router;
