const { Router } = require("express");
const postsController = require("../controllers/postsController");
const { isAuthor } = require("./authMiddleware");

const postsRouter = Router();

postsRouter.get("/unpublished", isAuthor, postsController.getUnpublishedPosts);

postsRouter.get("/", postsController.getPublishedPosts);
postsRouter.post("/", isAuthor, postsController.createPost);

module.exports = postsRouter;
