const passport = require('passport');
const WrikeStrategy = require('passport-wrike-oauth2').OAuth2Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Use the WrikeStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

//Define submitBtn as the login button which triggers the oauth2 request
const submitBtn = document.getElementById('btnLogin');

//Add a click listener on the button to trigger the function inside.
submitBtn.addEventListener('click', () => {
    passport.authenticate('wrike');
    passport.use(
        new WrikeStrategy({
                clientID:       "IrUM6Zg7",
                clientSecret:   "qT2ehL9Q8m4aCSTBv1WBt78UV9XLunCphi8U6RJxtm3ooGHNCe7BYO4tz2PB5hvY",
                callbackURL:    'http://localhost:3000/auth/wrike/callback'
            },
            function (accessToken, refreshToken, profile, done) {
                // asynchronous verification, for effect...
                process.nextTick(function () {
                    // To keep the example simple, the user's Wrike profile is returned to
                    // represent the logged-in user.  In a typical application, you would want
                    // to associate the Wrike account with a user record in your database,
                    // and return that user instead.
                    return done(null, profile);
                });
            }
        )
    );
});