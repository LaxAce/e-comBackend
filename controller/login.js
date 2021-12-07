import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const maxAge = 3 * 24 * 60 * 60;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    const token = jwt.sign(
      { id: user._id },
      "this is a token and i hope it works this time",
      { expiresIn: maxAge }
    );

    console.log(token);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ user });

    // console.log(email, password);
    // console.log(!(email && password));

    // if (!(email && password)) {
    //   return res.status(400).json({ msg: "All inputs are required" });
    // }

    // console.log("yes");
    // const user = await User.findOne({ email });

    // if (user && user.comparePassword(password)) {
    //   // console.log(user.comparePassword(password));

    //   const token = jwt.sign(
    //     { userId: user._id, email },
    //     process.env.TOKEN_KEY,
    //     { expiresIn: "2h" }
    //   );

    //   user.token = token;

    //   return res.status(200).json({ user });
    // }
    // res.status(400).json({ msg: "Incorrect Password, Please try again" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default login;
