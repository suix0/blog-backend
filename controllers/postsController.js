const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

exports.getPublishedPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
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

exports.getPost = async (req, res) => {
  const post = await prisma.post.findMany({
    where: {
      id: Number(req.params.postId),
    },
  });
  res.json({ post });
};

exports.createPost = async (req, res) => {
  if (req.user.role === "USER") {
    res.json({
      error: "You are not authorized to perform this action",
    });
    return;
  }

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

exports.getPostComments = async (req, res) => {
  const postId = Number(req.params.postId);
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      User: {
        select: {
          username: true,
        },
      },
    },
  });

  res.json({
    comments,
  });
};

exports.createPostComments = async (req, res) => {
  const postId = Number(req.params.postId);
  const comment = await prisma.comment.create({
    data: {
      comment: req.body.comment,
      userId: req.user.id,
      postId: postId,
    },
  });

  res.json({
    comment,
    message: "Comment created succesfully.",
  });
};

exports.postLikes = async (req, res) => {
  const postId = Number(req.params.postId);
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
  res.sendStatus(200);
};
