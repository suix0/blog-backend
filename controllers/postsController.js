const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

exports.getPublishedPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });

  res.json({
    posts,
  });
};

exports.getUnpublishedPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      published: false,
    },
  });
  res.json({ posts });
};

exports.createPost = async (req, res) => {
  await prisma.post.create({
    data: {
      published: req.body.published === "true",
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id,
    },
  });

  res.json({
    message: "Post created successfuly",
  });
};
