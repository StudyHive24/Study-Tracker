import { hashPassword, comparePasswords } from "../helpers/user.js";
import jwt from "jsonwebtoken";
import User from "../models/authentication/user.model.js";
import generateToken from "../helpers/generateToken.js";
import Token from "../models/authentication/Token.js";
import crypto from "crypto";
import hashToken from "../helpers/hashToken.js";
import emailSend from "../helpers/emailSend.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { uploadToCloudinary } from "../config/cloudinary.js";
import { error } from "console";
import asyncHandler from "express-async-handler";

export const test = (req, res) => {
  res.json("test is working");
};

// register user
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if name was entered
    if (!name) {
      return res.json({ error: "Name is required" });
    }

    // Password validation regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if password is valid
    if (!password) {
      return res.json({ error: "Password is required" });
    }
    if (!passwordRegex.test(password)) {
      return res.json({
        error:
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ error: "Enter a valid email" });
    }

    // Check if email exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email is already taken" });
    }

    // Check if username exists
    const exist2 = await User.findOne({ name });
    if (exist2) {
      return res.json({ error: "Username is already taken" });
    }

    const hashedPassword = await hashPassword(password);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token with user ID
    const token = generateToken(user._id);

    // Send back the user and token in the response to the client
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'None',
      secure: false,
      domain: 'study-hive-server-f6.vercel.app'
    });

    if (user) {
      const { _id, name, email, role, photo, bio, isVerified } = user;

      // 201 Created
      res.status(201).json({
        _id,
        name,
        email,
        role,
        photo,
        bio,
        isVerified,
        token,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// login endpoint
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ name } || { email });

    console.log(user);

    if (!user) {
      return res.json({
        error: "No user found, sign up!",
      });
    }

    // check if passwords match
    const match = await comparePasswords(password, user.password);

    console.log(match);

    console.log(user.password);

    if (!match) {
      return res.json({
        error: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id);

    const { _id, photo, bio, isVerifed } = user;

    // set the token in the cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'None',
      secure: true,
      domain: 'study-hive-server-f6.vercel.app'
    });

    // send back tot the user and token in the response to the client
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      bio,
      isVerifed,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// logout user
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    path: "/",
    expires: new Date(0),
    domain: 'study-hive-server-f6.vercel.app'
  });

  res.status(200).json({
    message: "User Logged out successfully",
  });
});

// update user details
export const updateUser = asyncHandler(async (req, res) => {
  try {
    // get the user details from the token using protect middleware
    const user = await User.findById(req.user._id);

    if (user) {
      // properties to update

      const email = req.body.email;
      const name = req.body.name;

      const exist = await User.findOne({ email });

      if (exist) {
        return res.json({
          error: "email is already taken",
        });
      }

      const existName = await User.findOne({ name });
      if (existName) {
        return res.json({
          error: "username is already taken",
        });
      }

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.json({ error: "Enter a valid email" });
      }

      // to update properties
      user.name = req.body.name || user.name;
      user.bio = req.body.bio || user.bio;
      user.photo = req.body.photo || user.photo;
      user.email = req.body.email || user.email;

      // to save the updated data
      const updated = await user.save();

      res.status(200);
      res.json({
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        photo: updated.photo,
        bio: updated.bio,
        isVerified: updated.isVerified,
      });
    }
  } catch (error) {
    res.json({
      message: "User not found",
    });
  }
});

// login status
export const userLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "Please login!",
    });
  }

  try {
    // to verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      res.status(200).json(true);
    } else {
      res.status(401).json(false);
    }
  } catch (error) {
    res.status(401);
    return res.json({
      message: "Invalid Token",
    });
  }
});

// email verification
export const emailVerify = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // check if user is already verified
  if (user.isVerified) {
    return res.status(400).json({ message: "User is already verified" });
  }

  let token = await Token.findOne({ userId: user._id });

  // if token exists --> delete the token
  if (token) {
    await token.deleteOne();
  }

  // create a verification token using the user id --->
  const verificationToken = crypto.randomBytes(64).toString("hex") + user._id;

  // hast the verification token
  const hashedToken = hashToken(verificationToken);

  await new Token({
    userId: user._id,
    verificationToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }).save();

  // verification link
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

  // send email
  const subject = "Email Verification - AuthKit";
  const send_to = user.email;
  const reply_to = "noreply@gmail.com";
  const template = "emailVerification";
  const send_from = process.env.USER_EMAIL;
  const name = user.name;
  const url = verificationLink;

  try {
    // order matters ---> subject, send_to, send_from, reply_to, template, name, url
    await sendEmail(subject, send_to, send_from, reply_to, template, name, url);
    return res.json({ message: "Email sent" });
  } catch (error) {
    console.log("Error sending email: ", error);
    return res.status(500).json({ message: "Email could not be sent" });
  }
});

export const emailVerificationCode = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified == "yes") {
      return res.status(400).json({ message: "User is already verified" });
    }

    // Generate a 6-digit verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    // Set expiration time (e.g., 15 minutes from now)
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

    // Save code and expiration to the user document
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = expirationTime;
    await user.save();

    // send email
    const subject = "Email Verification - StudyHive";
    const send_to = user.email;
    const reply_to = "noreply@gmail.com";
    const template = "emailVerification";
    const send_from = process.env.USER_EMAIL;
    const name = user.name;
    const code = verificationCode;

    await emailSend(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      code
    );

    res.status(200).json({ message: "Verification code sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const verifyCode = asyncHandler(async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified == "yes") {
      return res.status(400).json({ message: "User is already verified" });
    }

    // Check if the code matches and is not expired
    if (
      user.verificationCode !== verificationCode ||
      user.verificationCodeExpires < Date.now()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    // Mark the user as verified
    user.isVerified = "yes";
    user.verificationCode = null; // Clear the code
    user.verificationCodeExpires = null; // Clear the expiration
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// reset password request
export const requestPasswordReset = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    // Generate a 6-digit password reset code
    const resetCode = crypto.randomInt(100000, 999999).toString();

    // Set expiration time (e.g., 15 minutes from now)
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

    // Save the code and expiration to the user document
    user.verificationCode = resetCode;
    user.verificationCodeExpires = expirationTime;
    await user.save();

    // send email
    const subject = "Password Reset - StudyHive";
    const send_to = user.email;
    const reply_to = "noreply@gmail.com";
    const template = "forgotPassword";
    const send_from = process.env.USER_EMAIL;
    const name = user.name;
    const code = resetCode;

    await emailSend(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      code
    );

    res.status(200).json({ message: "Password reset code sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// verify password reset code
export const verifyPasswordResetCode = asyncHandler(async (req, res) => {
  try {
    const { email, resetCode } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    // Check if the code matches and is not expired
    if (
      user.verificationCode !== resetCode ||
      user.verificationCodeExpires < Date.now()
    ) {
      return res.json({ error: "Invalid or expired reset code" });
    }

    res.status(200).json({ message: "Reset code verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// password reset
export const passwordReset = asyncHandler(async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if email and newPassword are provided
    if (!email || !newPassword) {
      return res.json({ error: "Email and new password are required." });
    }

    // Validate password strength
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.json({
        error:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found." });
    }

    // Check if the new password is the same as the old one
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.json({
        error: "New password cannot be the same as the old password.",
      });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password and clear verification details
    user.password = hashedPassword;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    res.json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get user
export const getUser = asyncHandler(async (req, res) => {
  // get user details from the token ---> excluding the password
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    // 404 not found
    return res.status(404).json({
      message: "User not found",
    });
  }
});

export const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid verification token" });
  }
  // hash the verification token --> because it was hashed before saving
  const hashedToken = hashToken(verificationToken);

  // find user with the verification token
  const userToken = await Token.findOne({
    verificationToken: hashedToken,
    // check if the token has not expired
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res
      .status(400)
      .json({ message: "Invalid or expired verification token" });
  }

  //find user with the user id in the token
  const user = await User.findById(userToken.userId);

  if (user.isVerified) {
    // 400 Bad Request
    return res.status(400).json({ message: "User is already verified" });
  }

  // update user to verified
  user.isVerified = true;
  await user.save();
  res.status(200).json({ message: "User verified" });
});

// forgot password
export const forgotPassowrd = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    return res.json({
      message: "Email is required",
    });
  }

  // check the existence of the user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    res.json({
      message: "User not found",
    });
  }

  // check the existence of the reset toke
  let token = await Token.findOne({ userID: user._id });

  // delete the token if it already exists
  if (token) {
    await token.deleteOne();
  }

  // create a reset token using user id, this will expires in 1 hour
  const passResetToken = crypto.randomBytes(64).toString("hex") + user._id;

  // hash the reset token
  const hashedToken = hashToken(passResetToken);

  await new Token({
    userID: user._id,
    passwordResetToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
  }).save();

  // reset link
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${passResetToken}`;

  // send email to the user
  const subject = "Password Reset - StudyHive";
  const send_to = user.email;
  const send_from = process.env.USER_EMAIL;
  const reply_to = "noreply@noreply.com";
  const template = "forgotPassword";
  const name = user.name;
  const url = resetLink;

  try {
    await emailSend(subject, send_to, send_from, reply_to, template, name, url);
    return res.json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log("Error in sending the email", error);
    res.status(500);
    return res.json({
      message: "Email couldn't be sent",
    });
  }
});

// reset password
export const resetPassword = asyncHandler(async (req, res) => {
  const { resetPasswordToken } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  // Hash the reset token
  const hashedToken = hashToken(resetPasswordToken);

  try {
    // Check if token exists and is valid
    const userToken = await Token.findOne({
      passwordResetToken: hashedToken,
      expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Find the user by ID
    const user = await User.findById(userToken.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = hashPassword(password);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Remove the token after successful password reset
    await userToken.deleteOne();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// change password
export const changePassword = asyncHandler(async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check for required fields
    if (!currentPassword || !newPassword) {
      return res.json({ error: "All fields are required." });
    }

    // Password validation rules
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.json({
        error:
          "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Find user by ID
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.json({ error: "User not found." });
    }

    // Check if current password matches
    const isMatch = await comparePasswords(currentPassword, user.password);
    if (!isMatch) {
      return res.json({ error: "Current password is incorrect." });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    // Save the updated password
    await user.save();

    // Regenerate and send a new token
    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "none",
      secure: true,
    });

    // Respond with success
    return res.status(200).json({
      message: "Password changed successfully.",
      token,
    });
  } catch (error) {
    console.error("Error during password change:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while changing the password." });
  }
});

export const uploadProfileImage = asyncHandler(async (req, res) => {
  try {
    // Extract the image URL and user ID
    const { imageUrl } = req.body;
    const userId = req.user.id; // Assuming this is coming from the token middleware

    // Ensure imageUrl is provided
    if (!imageUrl) return res.json({ message: "No image URL provided" });

    // Validate the image URL (simple check, can be more complex if needed)
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|tiff|webp))/i;
    if (!urlRegex.test(imageUrl)) {
      return res.json({ message: "Invalid image URL" });
    }

    // Find the user and update their profile picture
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true } // Return the updated user object
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success
    res.json({
      message: "Profile picture updated",
      image: updatedUser.image,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    return res.json(null);
  }
};