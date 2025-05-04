const express = require("express");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const authorsRouter = require("./routes/authorsRouter");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blog-frontend-dusky-delta.vercel.app",
      "blog-frontend-git-main-suix0s-projects.vercel.app",
      "blog-frontend-85kxmi7e5-suix0s-projects.vercel.app",
    ],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/authors", authorsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
