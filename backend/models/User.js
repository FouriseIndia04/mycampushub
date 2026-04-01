const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //  remove extra spaces
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use valid email"], //  validation
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

  role: {
  type: String,
  enum: ["admin", "student", "organizer"], // ✅ FIXED
  default: "student",
}
  },
  { timestamps: true }
);

//  Hide password + extra fields
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v; // optional clean response
  return obj;
};

module.exports = mongoose.model("User", userSchema);