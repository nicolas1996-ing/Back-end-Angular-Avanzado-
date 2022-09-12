const fs = require("fs");
const User = require("../models/users");
const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospitals.model");

const deletePath = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

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
      deletePath(oldPath);

      doctor.img = nameFileUpload;
      await doctor.save();
      return true;
      break;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) return false;

      const oldPathHosp = `./uploads/hospitals/${hospital.img}`;
      deletePath(oldPathHosp);

      hospital.img = nameFileUpload; 
      await hospital.save();
      return true;
      break;
    case "users":
      const user = await User.findById(id);
      if (!user) return false;

      const oldPathUser = `./uploads/users/${user.img}`;
      deletePath(oldPathUser);

      user.img = nameFileUpload;
      await user.save();
      return true;
      break;
  }
};

module.exports = {
  updateImage,
};
