const multer = require("multer");

// ✅ memory storage — no disk write, works on Vercel
const storage = multer.memoryStorage();

// File filter to only allow PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

exports.upload = multer({ storage, fileFilter });