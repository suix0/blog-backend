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
  const { publish, unpublish } = req.query;
  if (publish) {
    await prisma.post.update({
      where: {
        id: req.body.id,
      },
      data: {
        published: false,
      },
    });
    const publishedPosts = await prisma.post.findMany({
      where: {
        userId: req.user.id,
        published: true,
      },
    });
    const unpublishedPosts = await prisma.post.findMany({
      where: {
        userId: req.user.id,
        published: false,
      },
    });
    return res.json({ publishedPosts, unpublishedPosts });
  } else if (unpublish) {
    await prisma.post.update({
      where: {
        id: req.body.id,
      },
      data: {
        published: true,
      },
    });
    const publishedPosts = await prisma.post.findMany({
      where: {
        userId: req.user.id,
        published: true,
      },
    });
    const unpublishedPosts = await prisma.post.findMany({
      where: {
        userId: req.user.id,
        published: false,
      },
    });
    return res.json({ publishedPosts, unpublishedPosts });
  } else {
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
  }
};

exports.deletePost = async (req, res) => {
  await prisma.comment.deleteMany({
    where: {
      postId: req.body.id,
    },
  });

  await prisma.post.delete({
    where: {
      id: req.body.id,
    },
  });

  const publishedPosts = await prisma.post.findMany({
    where: {
      userId: req.user.id,
      published: true,
    },
  });

  const unpublishedPosts = await prisma.post.findMany({
    where: {
      userId: req.user.id,
      published: false,
    },
  });

  res.json({ publishedPosts, unpublishedPosts });
};
