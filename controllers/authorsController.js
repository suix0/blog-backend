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
  const authorPublishedPosts = await prisma.post.findMany({
    where: {
      userId: req.user.id,
      published: true,
    },
  });

  // Get unpublished posts
  const authorUnpublishedPosts = await prisma.post.findMany({
    where: {
      userId: req.user.id,
      published: false,
    },
  });

  res.json({ authorPublishedPosts, authorUnpublishedPosts });
};
