const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const app = express();
// https://www.npmjs.com/package/jsonwebtoken

// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// application/json
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/hello", (req, res) => {
  res.send("Hello!");
});
// register router
app.post("/api/users/register", (req, res) => {
  // adding client signup info into DB
  const user = new User(req.body);

  // mongoDB save
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // lookup DB to check if requested user email exists

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "user not found",
      });
    }
    // check password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "wrong password" });

      // generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // store token generated
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // been thru auth as true!
  console.log("auth success");
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
