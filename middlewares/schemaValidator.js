const { validationResult } = require("express-validator");

const schemaValidator = (req,res,next) => {
    const errors = validationResult(req); // check validator errors, check()
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'schema validator error',
        errors: errors.mapped(),
      });
    }
    next(); // not errors 
}

module.exports = {
    schemaValidator
}