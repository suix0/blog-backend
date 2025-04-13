const express = require("express");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
// app.use("/api/posts");

app.listen(5000);
