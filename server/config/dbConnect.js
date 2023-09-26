const mongoose = require("mongoose");

async function dbConnect() {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URI);
    // console.log(connected);
    console.log(`Database connected: ${connected.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
}

exports.dbConnect = dbConnect;
