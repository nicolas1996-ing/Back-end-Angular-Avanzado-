const fs = require("fs");
const User = require("../models/users");
const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospitals.model");

const updateImage = async (type, id, nameFileUpload) => {
  switch (type) {
    case "doctors":
      const doctor = await Doctor.findById(id);

      // ---------------validator---------------
      // ---------------------------------------
      if (!doctor) {
        console.log("Doctor not found");
        return false;
      }

      // ------------delete img last------------
      // ---------------------------------------
      const oldPath = `./uploads/doctors/${doctor.img}`;
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      doctor.img = nameFileUpload;
      await doctor.save();
      return true;
      break;
    case "hospitals":
      break;
    case "users":
      break;
  }
};

module.exports = {
  updateImage,
};
