const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospitals.model");

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
      doctors,
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

const updateDoctor = async (req, res) => {
  try {
    const { name, hospital } = req.body;
    const { id } = req.params;
    const createdBy = req.id; // token

    // --------------------validations--------------------
    // ---------------------------------------------------
    // hospital and doctor exist ?
    const doctor = await Doctor.findById(id);
    const hospitalAssociate = await Hospital.findById(hospital);
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "doctor by Id not exist",
      });
    }

    if (!hospitalAssociate) {
      return res.status(401).json({
        success: false,
        message: "hospital Id valid is required",
      });
    }

    // ----------------------update-----------------------
    // ---------------------------------------------------
    const updatesDoctor = {
      ...req.body,
      createdBy,
    };
    const doctorUpdated = await Doctor.findByIdAndUpdate(id, updatesDoctor, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "update doctor has been executed",
      doctorUpdated,
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

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorToBeDeleted = await Doctor.findById(id);
    if (!doctorToBeDeleted) {
      return res.status(401).json({
        success: false,
        message: "doctor by Id not exist",
      });
    }

    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: doctorToBeDeleted.name + " to has been deleted",
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

module.exports = {
  getDoctors,
  createDoctors,
  updateDoctor,
  deleteDoctor,
};
