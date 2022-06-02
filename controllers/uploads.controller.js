const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../utils/updateImage");


// http://localhost:3005/api/uploads/:type/:id
// type: entity 
// id: id unique
const fileUploads = (req, res) => {
  const typeAllowed = ["hospitals", "doctors", "users"];
  const extensionAllowed = ["png", "jpg", "jpeg", "gif"];
  const { type, id } = req.params;
  const file = req.files.image; // body >> form-data (value = file)
  const nameFile = file.name.split(".");
  const extension = nameFile[nameFile.length - 1];

  // ---------------------validators---------------------
  // ----------------------------------------------------

  // ------------------------type------------------------
  if (!typeAllowed.includes(type)) {
    return res.status(400).json({
      success: false,
      message: "type no valid, type should be: " + typeAllowed,
    });
  }

  // ----------------------file exist-------------------
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded.",
    });
  }

  // ------------------extension file-------------------
  if (!extensionAllowed.includes(extension)) {
    return res.status(400).json({
      success: false,
      message: "extension no valid, type should be: " + extensionAllowed,
    });
  }

  // ----------------name file generation----------------
  // ----------------------------------------------------
  const nameFileUpload = `${uuidv4()}.${extension}`;
  const path = `./uploads/${type}/${nameFileUpload}`;

  // ----------------save image in folder----------------
  // ----------------------------------------------------
  file.mv(path, function (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "has been an error when you move img",
      });
    }

    // --------------------Update BD-----------------------
    // ----------------------------------------------------
    
    const result = updateImage(type, id, nameFileUpload);

    if(result){
      res.status(200).json({
        success: true,
        message: "file has been upload and assign to "+type,
        nameFileUpload,
      });
    }else{
      res.status(200).json({
        success: true,
        message: "file has been upload, but has been assign to "+type,
        nameFileUpload,
      });
    }
  });
};

module.exports = {
  fileUploads,
};
