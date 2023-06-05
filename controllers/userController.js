import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export function updateUser(req, res, next) {
  const { id } = req.params;
  const updatedData = req.body;

  User.findByIdAndUpdate(id, updatedData, { new: true })
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).json({ message: "User updated successfully", user });
    })
    .catch((err) => {
      next(err);
    });
}

/* LOGGING IN */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase()});

    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//delete user
export function deleteUser(req, res) {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    });
}