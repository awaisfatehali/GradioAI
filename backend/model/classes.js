const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: [true, "Please enter class name"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classs", ClassSchema);
