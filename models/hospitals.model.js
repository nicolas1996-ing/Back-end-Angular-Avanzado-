const { Schema, model } = require("mongoose");

// ------------------Schema Definition----------------
// ---------------------------------------------------
// mongoose assign an Id to each user (automatically)
const HospitalSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId, // relation
    ref: "User",
    required: true
  },
});

// -----------modify response User (id) (optional)----
// ---------------------------------------------------
HospitalSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Hospital", HospitalSchema);
