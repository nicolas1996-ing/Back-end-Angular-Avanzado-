const { Schema, model } = require("mongoose");

// ------------------Schema Definition----------------
// ---------------------------------------------------
// mongoose assign an Id to each user (automatically)
const DoctorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId, // relation
    ref: "User",
    required: true,
  },
  hospital: {
    type: Schema.Types.ObjectId, // relation
    ref: "Hospital",
    required: true,
  },
});

// -----------modify response User (id) (optional)----
// ---------------------------------------------------
DoctorSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Doctor", DoctorSchema);
