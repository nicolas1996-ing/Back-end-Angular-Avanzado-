const jwt = require("jsonwebtoken");

const validateJSONWebToken = (req, res, next) => {
  // ----------------read token -----------------
  // --------------------------------------------
  const token = req.header("x-token");

  // ----------------verify token ---------------
  // --------------------------------------------
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token not found",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWTSECRET);
    // --------------token correct---------------
    // ----------add properties in req ----------
    req.uid = uid;
    next();
    console.log(uid);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "token not valid",
    });
  }
};

module.exports = {
  validateJSONWebToken,
};
