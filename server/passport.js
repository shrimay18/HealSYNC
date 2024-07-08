const googleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');


// const callback = (accessToken, refreshToken, profile, done) => {
//     // Handle the user profile and authentication logic
//     // For example, you could find or create a user in your database here
//     // Assuming you have a User model:
//     // User.findOrCreate({ googleId: profile.id }, (err, user) => {
//     //     return done(err, user);
//     // });

//     // For this example, we'll just pass the profile as the user
//     done(null, profile);
// };
passport.use(
    new googleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            scope: ['profile', 'email'],
        },
       function (accessToken, refreshToken, profile, done) {
           done(null, profile);
       }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
   