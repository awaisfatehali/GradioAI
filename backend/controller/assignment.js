const express = require("express");
const router = express.Router();
const fs = require("fs");
const pdfParse = require("pdf-parse");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const Assignment = require("../model/assignment");
const gradeWithAI = require("../utils/aigrader");
const { isAuthenticated } = require("../middleware/auth.js");
const cloudinary = require("../utils/cloudinary.js");

router.post(
  "/submit",
  upload.array("files"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { teacherId, criteria, level, className, classId } = req.body;
      console.log(classId, className);
      if (!req.files || req.files.length === 0)
        return next(new ErrorHandler("No files uploaded!", 400));

      if (!teacherId) {
        req.files.forEach((f) => fs.unlinkSync(f.path));
        return res.status(400).json({ message: "Teacher ID is missing" });
      }

      const results = [];

      for (const file of req.files) {
        const filePath = file.path;
        const fileBuffer = fs.readFileSync(filePath);

        const firstBytes = fs.readFileSync(filePath).slice(0, 20);
        
        let extractedText = "";
        try {
          const pdfResult = await pdfParse(fileBuffer);
          extractedText = pdfResult.text;
        } catch (err) {
          console.error(`Error parsing PDF ${file.originalname}:`, err);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          continue;
        }

        let aiResult;

        try {
          aiResult = await gradeWithAI(extractedText, criteria, level);
        } catch (err) {
          console.error("AI Grading Error:", err);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          continue;
        }
        let uploadResult;

        try {
          uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: "assignments",
            resource_type: "raw",
          });
        } catch (err) {
          console.error("Cloudinary Upload Error:", err);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          continue;
        }

        const newAssignment = new Assignment({
          teacherId,
          filename: file.filename,
          cloudinaryUrl: uploadResult.secure_url,
          cloudinaryPublicId: uploadResult.public_id,
          originalFilename: file.originalname,
          extractedContent: extractedText,
          grade: String(aiResult.grade),
          feedback: aiResult.feedback,
          criteria,
          class: {
            classId: classId,
            className: className,
          },
          strictNess: level,
          gradedAt: new Date(),
        });

        try {
          await newAssignment.save();
        } catch (err) {
          console.error("Mongo Save Error:", err);

          await cloudinary.uploader.destroy(uploadResult.public_id, {
            resource_type: "raw",
          });

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

          continue;
        }
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        results.push({
          _id: newAssignment._id,
          filename: file.originalname,
          grade: aiResult.grade,
          feedback: aiResult.feedback,
        });
      }

      res.status(200).json({
        success: true,
        message: "Grading Complete",
        data: results,
      });
    } catch (error) {
      console.error("Controller Error:", error);
      return next(new ErrorHandler(error.message || "Server Error", 500));
    }
  }),
);

router.get(
  "/allgraduser/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        return next(new ErrorHandler("Id required!", 500));
      }
      const alldata = await Assignment.find({ teacherId: id });
      if (!alldata) {
        return next(new ErrorHandler("No Data found", 500));
      }

      res.status(200).json({
        success: true,
        alldata,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message || "Server Error", 500));
    }
  }),
);

router.delete(
  "/del-assignment/:filename",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { filename } = req.params;

      if (!filename) {
        return next(new ErrorHandler("Provide filename!", 400));
      }

      // Decode filename in case it has spaces or special characters
      const decodedFilename = decodeURIComponent(filename);

      // Delete from database
      const assignment = await Assignment.findOneAndDelete({
        filename: decodedFilename,
      });

      if (!assignment) {
        return next(new ErrorHandler("Assignment not found!", 404));
      }

      // Construct full file path
      try {
        if (assignment.cloudinaryPublicId) {
          await cloudinary.uploader.destroy(assignment.cloudinaryPublicId, {
            resource_type: "raw",
          });
        }
      } catch (err) {
        console.error("Cloudinary Delete Error:", err);
      }

      res.status(200).json({
        success: true,
        message: "Assignment deleted successfully",
      });
    } catch (error) {
      console.error("Delete Route Error:", error);
      return next(new ErrorHandler(error.message || "Server Error", 500));
    }
  }),
);
module.exports = router;
