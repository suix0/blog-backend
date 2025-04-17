const { Router } = require("express");
const postsController = require("../controllers/postsController");
const { isUser } = require("./authMiddleware");

const postsRouter = Router();

postsRouter.get("/", postsController.getPublishedPosts);
postsRouter.get("/unpublished", isUser, postsController.getUnpublishedPosts);
postsRouter.post("/", isUser, postsController.createPost);

postsRouter.get("/:postId/comments", isUser, postsController.getPostComments);
postsRouter.post(
  "/:postId/comments",
  isUser,
  postsController.createPostComments
);

module.exports = postsRouter;
