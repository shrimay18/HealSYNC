const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./Models/Users'); // Adjust the path to your User model

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            scope: ['profile', 'email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    return done(null, user);
                }

                user = new User({
                    // googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,

                    // other fields can be initialized as needed
                });

                // await user.save();
                // done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;
