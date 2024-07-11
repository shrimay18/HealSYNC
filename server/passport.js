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
                console.log('Google Profile:', profile); // Log the profile to debug

                let user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    return done(null, user, { redirectHome: true });
                }

                console.log('New User:', profile.displayName, profile.emails[0].value); // Log new user details
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,

                    // other fields can be initialized as needed
                });

                await user.save();
                console.log('User saved:', user); // Log the saved user
                return done(null, user, { redirectHome: false });
            } catch (err) {
                return done(err, null);
            }
        }
    )
);
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { passport: { id: user.id, username: user.username, email:user.email, name: user.name}});
    });
});

passport.deserializeUser(async (data, done) => {
    try {
        const user = await User.findById(data.passport.id);
        if (user) {
            user.passport = data.passport; // Attach session data to user
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;