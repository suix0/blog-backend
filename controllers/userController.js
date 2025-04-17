const { PrismaClient } = require("../generated/prisma");
const jwt = require("jsonwebtoken");

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

  // Otherwise, register the user
  await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
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
  const passwordMatches = user[0].password === req.body.password;
  if (!passwordMatches) {
    return res.json({
      passwordIncorrect: true,
    });
  }

  // Create a JWT token
  jwt.sign({ user: user[0] }, process.env.SECRET, (err, token) => {
    if (err) return console.error(err);
    res.json({
      token,
    });
  });
};
