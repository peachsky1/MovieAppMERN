const { User } = require("../models/User");

let auth = (req, res, next) => {
    // auth process
    // fetch token from client cookie then, decode that token to find user
    let token = req.cookies.x_auth;
    // decode the token and find user
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });
        req.token = token;
        req.user = user;
        next();
    });
};
module.exports = { auth };