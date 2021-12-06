import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ msg: "All input is required..." });
    }

    const user = await User.findOne({ email });

    if (user && user.comparePassword(password)) {
      console.log(user.comparePassword(password));

      const token = jwt.sign(
        { userId: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      user.token = token;

      return res.status(200).json({ user });
    }
    res.status(400).json({ msg: "Incorrect Password, Please try again" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export default login;
