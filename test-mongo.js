const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log("Connecting...");
    await mongoose.connect('mongodb+srv://mmaurya2003_db_user:xi3URCotDG36NThm@cluster0.osbahi6.mongodb.net/test', {
      serverSelectionTimeoutMS: 5000
    });
    console.log("SUCCESS!");
    process.exit(0);
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

testConnection();
