var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const PORT = process.env.PORT || 5000;

var GOOGLE_GRAPH_CLIENT_ID = process.env.GOOGLE_GRAPH_CLIENT_ID;
var GOOGLE_GRAPH_CLIENT_SECRET = process.env.GOOGLE_GRAPH_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_GRAPH_CLIENT_ID,
      clientSecret: GOOGLE_GRAPH_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      // Assuming User.findOrCreate is defined elsewhere
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

const authentication = passport.authenticate("google", { scope: ["profile"] });

const callback = (req, res) => {
  passport.authenticate("google", { failureRedirect: "/" })(
    req,
    res,
    function () {
      res.redirect("/");
    }
  );
};

module.exports = {
  authentication: authentication,
  callback: callback,
};
