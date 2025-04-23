const { PrismaClient } = require("../generated/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username can't be empty.")
    .custom(async (value) => {
      const username = await prisma.user.findMany({
        where: {
          username: value,
        },
      });
      if (username.length > 0) {
        throw new Error("User already exists.");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password can't be empty.")
    .isLength({ min: 8 })
    .withMessage("Password must have a minimum of 8 characters"),
];

exports.registerUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    // Otherwise, register the user
    await prisma.user.create({
      data: {
        username: req.body.username,
        password: encryptedPassword,
        role: req.body.role === "ADMIN" ? "ADMIN" : "USER",
      },
    });

    res.json({
      message: "User created successfully",
    });
  },
];

exports.loginUser = async (req, res) => {
  // Check if user exist
  const user = await prisma.user.findMany({
    where: {
      username: req.body.username,
    },
  });

  if (user.length < 1) {
    res.status(500).json({ error: "Username does not exist." });
    return;
  }

  // Check if the password matches
  const passwordMatches = await bcrypt.compare(
    req.body.password,
    user[0].password
  );

  if (!passwordMatches) {
    res.status(500).json({
      error: "Password Incorrect.",
    });
    return;
  }

  // Create a JWT token
  jwt.sign({ user: user[0] }, process.env.SECRET, (err, token) => {
    if (err) return console.error(err);
    res.json({
      token,
    });
  });
};
