const express = require("express");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const authorsRouter = require("./routes/authorsRouter");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/authors", authorsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
