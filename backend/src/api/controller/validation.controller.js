import User from "../../models/user.model.js";
import { comparePassword } from "../service/hash.service.js";

export const validateOnRegister = async (name, data, res) => {
  if (!data) {
    return res.status(400).json({ message: `${data} is required` });
  }
  try {
    const existingUser = await User.findOne({ [name]: data });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: `${name} is already taken`, isValid: false });
    }
    return res
      .status(200)
      .json({ message: `${name} is available`, isValid: true });
  } catch (error) {
    return res.status(500).json({ message: `Server Error`, error });
  }
};

export const validateOnLogin = async (name, data, pw, res) => {
  if (!data) {
    return res.status(400).json({ message: `${name} is required` });
  }
  try {
    const targetUser = await User.findOne({ [name]: data });
    const userObj = targetUser.toObject();
    const { password, ...user } = userObj;

    if (targetUser) {
      const isMatch = await comparePassword(pw, password);
      if (isMatch) {
        return res.status(200).json(user);
      }
      return res.status(400).json({ message: "Invalid username or password." });
    }
    return res.status(400).json({ message: "Invalid username or password." });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
