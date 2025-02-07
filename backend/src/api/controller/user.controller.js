import { User } from "../../models/models.js";
import { hashPassword } from "../service/hash.service.js";
import { getToken } from "../service/token.service.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ password: hashedPassword, ...rest });
    res.status(200).json({ message: "User Registration Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const token = getToken(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const target = await User.findById(decoded._id);
    const userObj = target.toObject();
    const { password, ...user } = userObj;

    if (!target) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: error.message });
  }
};
