const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/admin");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const username = "MuhammedMishal";
    const password = "Mishal@3973";

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username: username,
      password: hashedPassword,
    });

    await admin.save();

    console.log("Admin created successfully");
    console.log("Username:", username);
    console.log("Password:", password);

    process.exit();
  } catch (error) {
    console.log("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();