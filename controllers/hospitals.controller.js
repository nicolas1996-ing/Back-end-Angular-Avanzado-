const Hospital = require("../models/hospitals.model");

const getHospitals = async (req, res) => {
  // ---------------------------pagination---------------------------
  const page = Number(req.query.page) || 0;
  const limit = Number(req.query.limit) || 0;

  try {
    // --------there is a relation with cretedBy ( user table)--------
    // const hospitals = await Hospital.find().populate("createdBy", "name email");

    const [hospitals, totalhospitals] = await Promise.all([
      Hospital.find()
        .populate("createdBy", "name email")
        .skip(page)
        .limit(limit), // pagination
      Hospital.count(), // counter
    ]);

    res.status(200).json({
      success: true,
      message: "get hospital has been executed",
      hospitals,
      totalhospitals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "has been ocurred an error with server",
      controller: "hospitals.controller",
    });
  }
};

const postHospital = async (req, res) => {
  // -----------Get user Id from jsonTokenValidator-----
  // ---------------------------------------------------
  const uid = req.uid;
  const hospital = new Hospital({ ...req.body, createdBy: uid });

  try {
    const hospitalSaveDB = await hospital.save();
    res.status(200).json({
      success: true,
      message: "post hospital has been executed",
      hospital: hospitalSaveDB,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "has been ocurred an error with server",
      controller: "hospitals.controller",
    });
  }
};

const updateHospital = async (req, res) => {
  try {
    const { uid } = req; // token
    const { id } = req.params;
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(401).json({
        success: false,
        message: "hospital not find by Id",
      });
    }

    // ---------------update hospital name----------------
    // ---------------------------------------------------
    const updatesHospital = {
      ...req.body,
      createdBy: uid,
    };

    const hospitalUpdated = await Hospital.findByIdAndUpdate(
      id,
      updatesHospital,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "updated hospital has been executed",
      hospitalUpdated,
      uid: req.params.id,
      queryParams: req.query.page || "",
      headerParams: req.header("x-token") || "",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "has been ocurred an error with server",
      controller: "hospitals.controller",
    });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const hospitalToBeDeleted = await Hospital.findById(id);

    if (!hospitalToBeDeleted) {
      return res.status(401).json({
        success: false,
        message: "hospital not find by Id",
      });
    }

    await Hospital.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: hospitalToBeDeleted.name + " has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "has been ocurred an error with server",
      controller: "hospitals.controller",
    });
  }
};

module.exports = {
  getHospitals,
  postHospital,
  updateHospital,
  deleteHospital,
};
