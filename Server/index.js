var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  session = require("express-session"),
  auth = require("./controllers/microsoftController");
basic = require("./controllers/basicController");
googleController = require("./controllers/googleController");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

var app = express();

// cors
// app.use(credentials);
// app.use(cors(corsOptions));
app.use(cors());

// Basic Express configuration
app.use(bodyParser.json());
app.use(methodOverride());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(auth.passport.initialize());
app.use(auth.passport.session());

app.get("/", basic.index);
app.get("/account", basic.account);
app.get("/logout", basic.logout);

// GET /auth/microsoft
// app.get("/auth/microsoft", auth.authentication);
var passport = require("passport");
const authentication = passport.authenticate("microsoft", {
  // Optionally add any authentication params here
  // prompt: 'select_account'
});
app.get(
  "/auth/microsoft",
  (req, res, next) => {
    console.log("Starting Microsoft authentication");
    authentication(req, res, next);
    console.log("Microsoft authentication completed");
    // console.log(req);
  },
  (req, res) => {
    // Handle any post-authentication logic here
  }
);

// GET /auth/microsoft/callback
app.get("/auth/microsoft/callback", auth.microsoftCallback);

// GET /auth/google
app.get("/auth/google", googleController.authentication);
// GET /auth/google/callback
app.get("/auth/google/callback", googleController.callback);

app.listen(PORT);

console.log(`App running on http://localhost:${PORT}`);
