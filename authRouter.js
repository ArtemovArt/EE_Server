import bcrypt from "bcrypt";
import config from "config";
import Router from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import authMiddleware from "./middleware/auth.middleware.js";
import User from "./models/User.js";

const authRouter = new Router();
authRouter.post(
  "/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password should be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
    check("userName"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect request", errors });
      }
      const { email, password, userName } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashedPassword, userName });
      await user.save();
      return res.json({ message: "User was created successfuly" });
    } catch (error) {
      console.log(error.message);
      res.send({ message: "Server error" });
    }
  }
);

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `User ${email} not found` });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: { id: user.id, email: user.email, userName: user.userName },
    });
  } catch (error) {
    console.log(error.message);
    res.send({ message: "Server error" });
  }
});

authRouter.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: { id: user.id, email: user.email, userName: user.userName },
    });
  } catch (error) {
    console.log(error);
    res.send({ message: "Server error" });
  }
});

export default authRouter;
