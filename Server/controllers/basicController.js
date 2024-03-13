require("dotenv").config();

const PORT = process.env.PORT || 5000;

const index = (req, res) => {
  if (req.user) {
    return res.status(200).send(req?.user);
  }
  return res.status(401).send("User not found");
};

const account = (req, res) => {
  ensureAuthenticated;
  if (req.user) {
    return res.status(200).send(req?.user);
  }
  return res.redirect("/");
};

const logout = (req, res) => {
  req.logout();
  return res.status(200).send("Logged out");
};

module.exports = {
  index,
  account,
  logout,
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
