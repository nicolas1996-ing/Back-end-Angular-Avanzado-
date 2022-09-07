const jwt = require("jsonwebtoken");
const User = require("../models/users");

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
    const { uid, email } = jwt.verify(token, process.env.JWTSECRET);
    // --------------token correct---------------
    // ----------add properties in req ----------
    req.uid = uid;
    req.email = email;
    next();
    // console.log(uid);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "token not valid",
      error,
    });
  }
};

const validateAdminRole = async (req, res, next) => {
  // here we have access to the uid user
  const uid = req.uid; // uid user

  try {
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user no found",
        error,
      });
    }

    if (user.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        success: false,
        message: "user is not admin",
        error,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "user is not admin",
      error,
    });
  }
};

// aplicado al metodo patch
const validateAdminRoleOrSameUser = async (req, res, next) => {
  // here we have access to the uid user
  const uid = req.uid; // uid user
  const idToModify = req.params.id; // usuario que se quiere modificar

  try {
    const user = await User.findById(uid);
    const userToModify = await User.findById(idToModify);
    const sameUser = JSON.stringify(user) === JSON.stringify(userToModify);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user no found",
        error,
      });
    }

    // usuario no admin
    // usuario que no tenga rol de admin pero que se quiera modificar así mismo
    if (user.role === "ADMIN_ROLE" || sameUser) {
      next(); // usuario administrador o mismo usuario
    } else {
      return res.status(403).json({
        success: false,
        message: "user is not admin",
        error,
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "user is not admin",
      error,
    });
  }
};

module.exports = {
  validateJSONWebToken,
  validateAdminRole,
  validateAdminRoleOrSameUser,
};
