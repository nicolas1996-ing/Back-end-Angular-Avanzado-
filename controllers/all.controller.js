const User = require("../models/users");
const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospitals.model");

const getAllInfo = async (req, res) => {
  try {
    const { paramSearch } = req.params;
    const regex = new RegExp(paramSearch, "i"); // may mins , active search by param

    // ---------all user match with param---------
    // -------------------------------------------
    // const users = await User.find({ name: regex });
    // const doctors = await Doctor.find({ name: regex });
    // const hospitals = await Hospital.find({ name: regex });

    const [users, doctors, hospitals] = await Promise.all([
      User.find({ name: regex }),
      Doctor.find({ name: regex }),
      Hospital.find({ name: regex }),
    ]);

    res.status(200).json({
      success: true,
      paramSearch,
      users,
      doctors,
      hospitals,
      message: "all router found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "something was wrong, retry again",
      controller: "all.controller.js",
    });
  }
};

getAllInfoByCollection = async (req, res) => {
  const table = req.params.table;
  const { paramSearch } = req.params;
  const regex = new RegExp(paramSearch, "i");
  let data;

  switch (table) {
    case "users":
      data = await User.find({ name: regex });
      break;

    case "hospitals":
      data = await Hospital.find({ name: regex }).populate(
        "createdBy",
        "name img"
      );
      break;

    case "doctors":
      data = await Doctor.find({ name: regex })
        .populate("createdBy", "name img")
        .populate("hospital", "name img");

      break;

    default:
      return res.status(400).json({
        success: false,
        message: "table should be: doctors, hospitals or users",
        collection: table
      });
  }

  return res.status(200).json({
    success: true,
    data,
  });
};

module.exports = {
  getAllInfo,
  getAllInfoByCollection,
};
