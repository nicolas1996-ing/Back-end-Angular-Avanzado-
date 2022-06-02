const Hospital = require("../models/hospitals.model");

const getHospitals = async (req, res) => {
  try {
    // --------there is a relation with cretedBy ( user table)--------
    const hospitals = await Hospital.find().populate("createdBy", "name email",);
    res.status(200).json({
      success: true,
      message: "get hospital has been executed",
      hospitals,
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

const updateHospital = (req, res) => {
  res.status(200).json({
    success: true,
    message: "updated hospital has been executed",
    uid: req.params.id,
    queryParams: req.query.page || "",
    headerParams: req.header("token") || "",
  });
};

const deleteHospital = (req, res) => {
  res.status(200).json({
    success: true,
    message: "delete hospital has been executed",
  });
};

module.exports = {
  getHospitals,
  postHospital,
  updateHospital,
  deleteHospital,
};
