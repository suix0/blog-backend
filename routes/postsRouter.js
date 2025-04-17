const { Router } = require("express");
const postsController = require("../controllers/postsController");
const { isUser } = require("./authMiddleware");

const postsRouter = Router();

postsRouter.get("/", postsController.getPublishedPosts);
postsRouter.get("/unpublished", isUser, postsController.getUnpublishedPosts);
postsRouter.get("/:postId", isUser, postsController.getPost);
postsRouter.post("/", isUser, postsController.createPost);

postsRouter.get("/:postId/comments", isUser, postsController.getPostComments);
postsRouter.post(
  "/:postId/comments",
  isUser,
  postsController.createPostComments
);

// Update number of likes of a specific post
postsRouter.put("/:postId/likes", postsController.postLikes);

module.exports = postsRouter;
