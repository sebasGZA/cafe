const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const dbUrl = process.env.MONGODB_CNN;

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Db online");
  } catch (e) {
    console.log(e);
    throw new Error("Error running db");
  }
};

module.exports = {
  dbConnection,
};
