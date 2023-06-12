import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todolist",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/todos", (req, res) => {
  const q = "SELECT * FROM todos";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/todos", (req, res) => {
  const q =
    "INSERT INTO todos(`id`, `completed`, `isEditing`, `task`) VALUES (?)";

  const values = [
    req.body.id,
    req.body.completed,
    req.body.isEditing,
    req.body.task,
  ];
  console.log(values);

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/delete", (req, res) => {
  const todoId = req.body.id;
  const q = " DELETE FROM todos WHERE id = ? ";

  db.query(q, todoId, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/toogle", (req, res) => {
  const todoId = req.body.id;
  const q = "UPDATE todos SET `completed`= ? WHERE id = ?";

  const completeStatus = req.body.status;

  db.query(q, [completeStatus, todoId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/edit", (req, res) => {
  const todoId = req.body.id;
  const q = "UPDATE todos SET `isEditing`= ? WHERE id = ?";

  const isEdit = req.body.isEditing;

  db.query(q, [isEdit, todoId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/update", (req, res) => {
  const todoId = req.body.id;
  const q = "UPDATE todos SET `isEditing`= ? , `task` = ? WHERE id = ?";

  const values = [req.body.isEditing, req.body.task];

  db.query(q, [...values, todoId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
