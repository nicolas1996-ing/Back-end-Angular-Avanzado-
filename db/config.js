// ------------------config mongoose ORM--------------
// ---------------------------------------------------
const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
     const stringConnection = process.env.DB_CNN 
    await mongoose.connect(stringConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('bd running ...')
  } catch (error) {
    console.log(error);
    throw new Error("Failed init bd connection");
  }
};

module.exports = {
    dbConnection
}