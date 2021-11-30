import User from "../models/user.js";

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
    const users = await User.create(req.body);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error });
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
