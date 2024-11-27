import User from "../../models/user.model.js";
import { hashPassword } from "../service/hash.service.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ password: hashedPassword, ...rest });
    res.status(200).json(user);
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
  const token = req.cookies[process.env.TOKEN];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    const userObj = user.ToObject();

    const { password, ...fetchedUser } = userObj;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(fetchedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
