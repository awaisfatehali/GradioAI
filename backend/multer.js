const multer = require("multer");
const path = require("path"); // for extension handling

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // get original extension (.pdf)
    const name = path.basename(file.originalname, ext); // file name without extension
    cb(null, `${name}-${uniqueSuffix}${ext}`); // keep the extension
  },
});

// File filter to only allow PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

exports.upload = multer({ storage, fileFilter });
