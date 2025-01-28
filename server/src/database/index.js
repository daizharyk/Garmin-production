const mongoose = require("mongoose");

module.exports = async () => {
  try {
 
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
};
