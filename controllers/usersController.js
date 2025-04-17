const { PrismaClient } = require("../generated/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
  // Check if username already exists
  const user = await prisma.user.findMany({
    where: {
      username: req.body.username,
    },
  });

  if (user.length > 0) {
    return res.json({
      error: "Username already exists",
    });
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
};

exports.loginUser = async (req, res) => {
  // Check if user exist
  const user = await prisma.user.findMany({
    where: {
      username: req.body.username,
    },
  });

  if (user.length < 1) {
    return res.json({
      userNonexistent: true,
    });
  }

  // Check if the password matches
  const passwordMatches = await bcrypt.compare(
    req.body.password,
    user[0].password
  );

  if (!passwordMatches) {
    res.json({
      passwordIncorrect: true,
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
