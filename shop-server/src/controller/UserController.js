import UserModels from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hasedPw = await bcrypt.hash(req.body.password, salt);

    const errors = validationResult(req);
    const user = new UserModels({
      username: req.body.username,
      email: req.body.email,
      password: hasedPw,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const users = await user.save();

    res.status(200).json({
      results: users,
      msg: "Register successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Register failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModels.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("wrong password");
    } else {
      const accessToken = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );
      res.status(200).json({
        user: user,
        token: accessToken,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await UserModels.findById(req.query.userId);
    if (!user) res.status(401).json("User not found");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "User not found " });
  }
};

const getListUser = async (req, res) => {
  try {
    const user = await UserModels.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updateUser = await UserModels.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      messgage: "Update success",
      user: updateUser,
    });
  } catch (error) {
    res.status(403).json({ msg: "Update failed" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const users = await UserModels.findById(req.params.id);

    await users.deleteOne();

    return res.status(200).json("Delete user successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
export { login, register, getUsers, getListUser, updateUser, deleteUser };
