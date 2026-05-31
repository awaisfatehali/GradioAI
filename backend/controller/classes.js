const Class = require("../model/classes");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const Assignment = require("../model/assignment")

const router = express.Router();

// create a new class
router.post(
  "/create-class",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { className, description, teacherId } = req.body;
      if (!className || !description) {
        return next(new ErrorHandler("Provide Each field", 500));
      }
      const createdclass = await Class.create({
        className: className,
        description: description,
        teacherId: teacherId,
      });
      res.status(201).json({
        successs: true,
        createdclass,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all classes for a teacher

router.get(
  "/allclasses/:teacherid",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { teacherid } = req.params;
      if (!teacherid) {
        return next(new ErrorHandler("Not authorized", 401));
      }

      const classes = await Class.find({ teacherId: teacherid });

      if (!classes || classes.length === 0) {
        return next(new ErrorHandler("No data found", 404));
      }

      res.status(200).json({
        success: true,
        classes,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// delete a class
router.delete("/delete_class/:id", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  try {
    const id = req.params.id;

    const delClass = await Class.findById(id);
    if (!delClass) {
      return next(new ErrorHandler("Class not found", 404));
    }

    // Delete all assignments where class.classId matches
    await Assignment.deleteMany({ "class.classId": id });

    // Delete the class
    await delClass.deleteOne();

    res.status(200).json({
      success: true,
      message: "Class and its assignments deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));



module.exports = router;
