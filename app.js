const express = require("express");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

app.listen(5000);
