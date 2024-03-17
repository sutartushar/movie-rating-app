const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User(userData);

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    //! console.log("hashedPassword from services - ", hashedPassword);

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    let { email, password } = userData;
    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    let isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //! console.log("token : ", token);
    //! console.log("user : ", user);

    return { user, token };
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser };
