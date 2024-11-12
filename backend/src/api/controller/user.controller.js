import User from "../../models/user.model.js";
import { hashPassword } from "../service/hash.service.js";

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
