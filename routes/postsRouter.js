const { Router } = require("express");
const postsController = require("../controllers/postsController");
const { isUser } = require("./authMiddleware");

const postsRouter = Router();

postsRouter.get("/", postsController.getPublishedPosts);
postsRouter.post("/", isUser, postsController.createPost);

postsRouter.get("/unpublished", isUser, postsController.getUnpublishedPosts);

postsRouter.get("/:postId/comments", isUser, postsController.getPostComments);

module.exports = postsRouter;
