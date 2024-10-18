const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_react_vite_db",
});

app.listen(8081, () => {
  console.log("Menjelaskan");
  const date = new Date();
  console.log(date);
});

app.get("/", (re, res) => {
  return res.json("Dari server iki rekkkk");
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE username=? AND password=?";

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json("Login Successfully!");
    } else {
      return res.json("no record");
    }
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/insert", async (req, res) => {
  try {
    const { nama, username, password, level } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const created_at = new Date();
    const updated_at = new Date();

    const sql = "INSERT INTO users (`nama`,`username`, `password`, `level`, `created_at`,`updated_at`) VALUES (?)";
    const values = [nama, username, hashedPassword, level, created_at, updated_at];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/update/:id", async (req, res) => {
  try {
    const updated_at = new Date();
    const id = req.params.id;
    const { nama, username, password, level } = req.body;

    let sql;
    let values;

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      sql = "UPDATE users SET `nama`=?, `username`=?, `password`=?, `level`=?, `updated_at`=? WHERE id = ?";
      values = [nama, username, hashedPassword, level, updated_at, id];
    } else {
      sql = "UPDATE users SET `nama`=?, `username`=?, `level`=?, `updated_at`=? WHERE id = ?";
      values = [nama, username, level, updated_at, id];
    }

    db.query(sql, values, (err, result) => {
      if (err) return res.json({ message: "error" });
      return res.json(result);
    });
  } catch {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete/:id", (req, res) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "error njirr.." });
    return res.json(result);
  });
});
