const User = require("../models/users");
const bcrypt = require("bcryptjs");
const { generateJSONWebToken } = require("../utils/jwt");

const getUsers = async (req, res) => {
  // -----------------pagination------------
  // ---------------------------------------
  const page = Number(req.query.page) || 0;
  const limit = Number(req.query.limit) || 0;
  // http://localhost:3005/api/users?page=1&limit=0
  // console.log(page,limit);

  // -------pagination: page, limit --------
  // ---------------------------------------
  // const users = await User.find().skip(page).limit(limit); // all properties schema
  // // const users = await User.find({}, "name email role google"); // some properties schema
  // const totalUsers = await User.count();

  const [users, totalUsers] = await Promise.all([
    User.find().skip(page).limit(limit), // pagination
    User.count(), // counter
  ]);

  // let users, totalUsers;
  // Promise.all([
  //   User.find().skip(page).limit(limit),
  //   User.count(),
  // ]).then(resp => {
  //   users = resp[0];
  //   totalUsers = resp[1];
  // })

  const infoRequest = {
    token: req.header("x-token"),
    params: req.body.params,
    query: req.query,
  };

  res.status(200).json({
    success: true,
    infoRequest,
    data: users,
    totalUsers,
    uidCurrentUser: req.uid, // middleware jsonTokenValidator
    message: "user routes found",
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const query = req.query; // opcionales
  const body = req.body;
  const headers = req.header("x-token");

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user no exist",
        error,
        id,
      });
    }

    return res.status(200).json({
      params: id,
      queryParams: query,
      requestBody: body,
      headers,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user no exist",
      error,
    });
  }
};

const createUser = async (req, res) => {
  const { email, password, name } = req.body;

  // -------------service logic-------------
  // ---------------------------------------
  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    }

    const user = new User(req.body);
    // ----------encrypt password----------
    // ------------------------------------
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // ---------------token generate---------------
    // --------------------------------------------
    const token = await generateJSONWebToken(user._id, user.email);

    res.status(200).json({
      message: "user has been creted",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "something was wrong, retry again",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userBD = await User.findById(id);
    if (!userBD) {
      return res.status(404).json({
        success: false,
        message: "user no found",
      });
    }

    // ToDo: token validation

    // ------------update user-------------
    // ------------------------------------
    const { password, google, email, ...fieldsToUpdate } = req.body; // omit password and google from req.body

    if (userBD.email !== email) {
      // verify that email isn't assing to other user
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          success: false,
          message: "user with this email already exist in bd",
        });
      }
    }

    // const userUpdate = await User.findByIdAndUpdate(id, fieldsToUpdate, {new: false}); // user with information last
    // google users can not update email
    if (!userBD.google) {
      fieldsToUpdate.email = email;
    }

    const userUpdate = await User.findByIdAndUpdate(
      id,
      { ...fieldsToUpdate },
      {
        new: true,
      }
    ); // user with informtation updated

    res.status(200).json({
      susccess: true,
      id,
      userUpdate,
      uidUserThatUpdated: req.uid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "unexpected error",
    });
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params.id;
  const userById = await User.findById(uid);

  if (!userById) {
    return res.status(400).json({
      success: false,
      message: "user no found",
    });
  }

  try {
    await User.findByIdAndDelete(uid);
    res.status(200).json({
      success: true,
      message: "user has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "unexpected error",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
