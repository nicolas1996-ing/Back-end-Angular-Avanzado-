const bcrypt = require("bcryptjs/dist/bcrypt");
const users = require("../models/users");
const { generateJSONWebToken } = require("../utils/jwt");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userdBD = await users.findOne({ email });

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

module.exports = {
  loginUser,
};
