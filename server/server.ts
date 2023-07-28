import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Todo from "./models/Todo";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.status(200).json({ todos });
});

app.post("/todo/create", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  todo.save();

  res.status(201).json({ todo });
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Todo deleted successfully.", result });
});

app.put("/todo/update/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    todo.complete = !todo.complete;

    todo.save();

    res.status(200).json({ message: "Todo updated successfully.", todo });
  } else {
    res.status(404).json({ message: "Todo not found." });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admindev@cluster1.p7xxthu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
