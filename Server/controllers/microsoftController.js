var passport = require("passport"),
  MicrosoftStrategy = require("passport-microsoft").Strategy;
require("dotenv").config();

const PORT = process.env.PORT || 5000;

var MICROSOFT_GRAPH_CLIENT_ID = process.env.MICROSOFT_GRAPH_CLIENT_ID;
var MICROSOFT_GRAPH_CLIENT_SECRET = process.env.MICROSOFT_GRAPH_CLIENT_SECRET;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new MicrosoftStrategy(
    {
      clientID: MICROSOFT_GRAPH_CLIENT_ID,
      clientSecret: MICROSOFT_GRAPH_CLIENT_SECRET,
      callbackURL: `http://localhost:5000/auth/microsoft/callback`,
      scope: ["user.read"],
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log("access token -> ", accessToken);
      // console.log("refresh token -> ", refreshToken);
      // console.log("profile -> ", profile);
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

const authentication = passport.authenticate(
  "microsoft",
  {
    // Optionally add any authentication params here
    // prompt: 'select_account'
  },
  function () {
    console.log("authentication");
  }
);

const microsoftCallback = (req, res) => {
  passport.authenticate("microsoft", { failureRedirect: "/" })(
    req,
    res,
    function () {
      console.log("callback");
      // res.redirect("/");
      // console.log(res?.req?.user);
      res.redirect("/");
    }
  );
};

module.exports = {
  passport: passport,
  authentication,
  microsoftCallback,
};
