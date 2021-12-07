import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const maxAge = 3 * 60 * 60 * 24;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ nbHits: users.length, users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      return res.status(400).json({ msg: "All input is required" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({ msg: "User Already Exist. Please Login" });
    }

    // const encryptedPassword = bcrypt.hash(password, 10);

    const users = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    // create token
    const token = jwt.sign(
      { userId: users._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    users.token = token;
    // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error.message);
  }

  // User.create(req.body)
  //   .then((result) => res.status(201).json({ result }))
  //   .catch((error) => res.status(500).json({ msg: error }));
};

const getUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ msg: `no user with the id: ${userId}` });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { getAllUsers, createUser, getUser };
