const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      required: true,
    },

    class: {
      classId: {
        type: String,
      },
      className: {
        type: String,
      },
    },

    filename: {
      type: String,
      required: true,
    },

    originalFilename: {
      type: String,
      required: true,
    },

    cloudinaryUrl: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      required: true,
    },

    extractedContent: {
      type: String,
    },

    grade: {
      type: String,
    },

    feedback: {
      type: String,
    },

    criteria: {
      type: String,
    },

    strictNess: {
      type: String,
    },

    gradedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assignment", AssignmentSchema);