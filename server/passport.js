const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/Users'); 

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
                    return done(null, user, { redirectHome: true });
                }
                console.log('New User:',profile.id, profile.displayName, profile.emails[0].value); 
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });



                console.log('User saved:', user); 
                return done(null, profile, { redirectHome: false });
            } catch (err) {
                return done(err, null);
            }
        }
    )
);
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    done(null, id);
});
module.exports = passport;