const jwt = require("jsonwebtoken");

const generateJSONWebToken = async (uid, email) => {
  return new Promise((res, rej) => {
    const payload = {
      email,
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: "12h" },
      (error, token) => {
        if (error) {
          console.log(error);
          rej(new Error(error));
        } else {
          res(token);
        }
      }
    );
  });
};

module.exports = {
  generateJSONWebToken,
};
