const Doctor = require("../models/doctors.model");

const getDoctors = async (req, res) => {
  try {
    // ------------populate: table relations-------------
    // -doctor has relation with user and hospital table- 
    const doctors = await Doctor.find()
      .populate("createdBy", "name email")
      .populate("hospital", "name");
    res.status(200).json({
      success: true,
      message: "get doctors has been executed",
      doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "has been ocurred an error with server",
      controller: "doctors.controller",
      error,
    });
  }
};

const createDoctors = async (req, res) => {
  // userId: token
  // hospitalId:

  // -----------Get user Id from jsonTokenValidator-----
  // ---------------------------------------------------
  const uid = req.uid;
  // const hospitalId = "628ccecd43841113b66978f4";
  // const doctor = new Doctor({ ...req.body, createdBy: uid, hospital: hospitalId });
  const doctor = new Doctor({ ...req.body, createdBy: uid });

  try {
    const doctorDB = await doctor.save();

    res.status(200).json({
      success: true,
      message: "create doctor has been executed",
      doctorDB,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "has been ocurred an error with server",
      controller: "doctors.controller",
      error,
    });
  }
};

const updateDoctor = (req, res) => {
  res.status(200).json({
    success: true,
    message: "update doctor has been executed",
  });
};

const deleteDoctor = (req, res) => {
  res.status(200).json({
    success: true,
    message: "delete doctor has been executed",
  });
};

module.exports = {
  getDoctors,
  createDoctors,
  updateDoctor,
  deleteDoctor,
};
