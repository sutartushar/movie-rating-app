const authServices = require("../services/authService.services");

const register = async (req, res) => {
  try {
    const userData = req.body;
    let user = await authServices.registerUser(userData);

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;
    const { userId, token } = await authServices.loginUser(userData);

    res.status(200).json({
      message: "User logged in successfully",
      userId,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
