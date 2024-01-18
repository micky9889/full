const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
    role: { type: String, default: "user" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = User = mongoose.model("user", UserSchema);
