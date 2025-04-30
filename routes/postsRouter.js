const { Router } = require("express");
const postsController = require("../controllers/postsController");
const { isUser } = require("./authMiddleware");

const postsRouter = Router();

postsRouter.get("/", postsController.getPublishedPosts);
postsRouter.get("/", isUser, postsController.getUnpublishedPosts);
postsRouter.get("/:postId", postsController.getPost);

postsRouter.get("/:postId/comments", isUser, postsController.getPostComments);
postsRouter.post(
  "/:postId/comments",
  isUser,
  postsController.createPostComments
);
module.exports = postsRouter;
