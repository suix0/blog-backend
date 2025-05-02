const { Router } = require("express");
const authorsController = require("../controllers/authorsController");
const { isUser } = require("./authMiddleware");

const authorsRouter = Router();

authorsRouter.get("/:authorId/posts", isUser, authorsController.getAuthorPosts);
authorsRouter.post("/:authorId/posts", isUser, authorsController.createPost);
authorsRouter.put("/:authorId/posts", isUser, authorsController.updatePost);
authorsRouter.delete("/:authorId/posts", isUser, authorsController.deletePost);

module.exports = authorsRouter;
