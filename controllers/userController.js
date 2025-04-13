const { PrismaClient } = require("../generated/prisma");

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
