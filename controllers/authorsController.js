const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

exports.getAuthorPosts = async (req, res) => {
  // Throw error if user is not author
  if (req.user.role !== "ADMIN") {
    return res
      .status(500)
      .json({ error: "You are not authorized to perform this action" });
  }
  // Get published posts
  const publishedPosts = await prisma.post.findMany({
    where: {
      userId: req.user.id,
      published: true,
    },
  });

  // Get unpublished posts
  const unpublishedPosts = await prisma.post.findMany({
    where: {
      userId: req.user.id,
      published: false,
    },
  });

  res.json({ publishedPosts, unpublishedPosts });
};

exports.createPost = async (req, res) => {
  const newPost = await prisma.post.create({
    data: {
      userId: req.user.id,
      published: true,
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.json({ newPost });
};

exports.updatePost = async (req, res) => {
  const updatedPost = await prisma.post.update({
    where: {
      id: req.body.postId,
    },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.json({ updatedPost });
};
