const express = require("express");
const router = express.Router();
const User = require("../model/user");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");

router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      console.log(userEmail);
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//  logout User
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Logout Succesfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// 1️⃣ Request Reset Password
router.post("/request-reset-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User does not exist", 400));
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "30m" } // token expires in 30 minutes
    );

    const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;

    await sendMail({
      email: user.email,
      subject: "Reset Your Password",
      message: `Hello ${user.name}, click here to reset your password: ${resetUrl}`,
    });

    res.status(200).json({
      success: true,
      message: `Password reset link sent to ${user.email}`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

router.post("/verify-reset-token", async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return next(new ErrorHandler("Token is required", 400));

    jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

    res.status(200).json({ success: true, message: "Token is valid" });
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 400));
  }
});
// 2️⃣ Reset Password
router.post("/reset-password", async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return next(new ErrorHandler("Token and new password are required", 400));
    }

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    user.password = newPassword; // Make sure your User model hashes password before save
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


module.exports = router;
