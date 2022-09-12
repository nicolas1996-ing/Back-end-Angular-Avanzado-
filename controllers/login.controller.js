const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/users");
const { googlVerify } = require("../utils/google-verify");
const { generateJSONWebToken } = require("../utils/jwt");
const { getMenuFrontend } = require("../utils/menu-front-end");

// -----------------auth method #1-----------------
// ------------------------------------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userdBD = await User.findOne({ email });

    // --------------verify: email-----------------
    // --------------------------------------------
    if (!userdBD) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        noValid: "email",
      });
    }
    // --------------verify: password--------------
    // --------------------------------------------
    const validPassword = bcrypt.compareSync(password, userdBD.password); // return boolean

    if (!validPassword) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        noValid: "password",
      });
    }

    // ---------------token generate---------------
    // --------------------------------------------
    const token = await generateJSONWebToken(userdBD._id, userdBD.email); // payload: _id and email
    // _id === uid (mongo)

    res.status(200).json({
      success: true,
      userdBD,
      token,
      menu: getMenuFrontend(userdBD.role),
      message: "Used has been logged",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "can not be the user login",
    });
  }
};

// -----------------auth method #2-----------------
// ------------------------------------------------
const googleSignIn = async (req, res) => {
  const { token } = req.body;

  try {
    const { name, email, picture } = await googlVerify(token);

    // -------------------verify user in bd-------------------
    // -------------------------------------------------------
    const userdBD = await User.findOne({ email });
    let newUser;

    if (!userdBD) {
      // -----------------create a new user------------------
      // ----------------------------------------------------
      newUser = new User({
        name,
        email,
        password: "@@@",
        image: picture,
        google: true,
      });
    } else {
      // --------------------user exist---------------------
      newUser = userdBD;
      newUser.google = true;
      newUser.password = "@@@";
    }

    // ---------------------save in bd---------------------
    await newUser.save();
    const JSOWebtoken = await generateJSONWebToken(newUser._id, newUser.email); // payload: _id and email

    return res.status(200).json({
      success: true,
      message: "Google Sign",
      JSOWebtoken,
      menu: getMenuFrontend(newUser.role),
      name,
      email,
      picture,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "incorrect token",
      error,
    });
  }
};

const renewToken = async (req, res) => {
  // -----------payload token : email and uid-----------
  // --------------------update token--------------------
  // ----------------------------------------------------
  try {
    const JSOWebtoken = await generateJSONWebToken(req.uid, req.email); // payload: _id and email
    const user = await User.findOne({ email: req.email });

    res.status(200).json({
      success: true,
      user,
      menu: getMenuFrontend(user.role),
      JSOWebtoken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "incorrect token",
      error,
    });
  }
};

module.exports = {
  loginUser,
  googleSignIn,
  renewToken,
};
