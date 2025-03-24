import { User } from "../../models/models.js";
import { comparePassword } from "../service/hash.service.js";

import jwt from "jsonwebtoken";

export const validateIdentifierOnRegister = async (data, res) => {
  if (!data) {
    return res.status(400).json({ message: `Username or Email is required` });
  }
  try {
    const existingUser = await User.findOne({
      $or: [{ username: data }, { email: data }],
    });

    if (existingUser) {
      let takenField = existingUser.username === data ? "Username" : "Email";
      return res.status(409).json({ message: `${takenField} is already taken`, isValid: false });
    }
    return res.status(200).json({ isValid: true });
  } catch (error) {
    return res.status(500).json({ message: `Server Error`, error });
  }
};

export const authenticateLogin = async (identifier, pw, res) => {
  if (!identifier) {
    return res.status(404).json({ message: `Invalid Credentials` });
  }
  try {
    const targetUser = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (targetUser) {
      const userObj = targetUser.toObject();
      const { password } = userObj;
      const isMatch = await comparePassword(pw, password);
      if (isMatch) {
        const token = jwt.sign({ _id: targetUser._id }, process.env.JWT_SECRET);
        res.cookie(process.env.TOKEN, token, {
          httpOnly: true,
          maxAge: 30 * 60 * 1000, // 5 minutes
          secure: process.env.NODE_ENV === "production", // Set to true in production
          sameSite: "lax",
        });
        return res.status(200).json({ token });
      }
      return res.status(404).json({ message: "Invalid Credentials." });
    }
    return res.status(404).json({ message: "Invalid Credentials." });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const logOut = async (req, res) => {
  try {
    const tokenName = process.env.TOKEN;

    if (!tokenName) {
      return res
        .status(500)
        .json({ error: "Server misconfiguration: TOKEN environment variable is missing" });
    }

    res.clearCookie(tokenName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // Ensure this matches how the cookie was originally set
    });

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: "SERVER_ERROR" });
  }
};
