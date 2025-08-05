import express from "express";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  prismaClient.user.findMany()
    .then(users => {
      res.json({users});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/createUser", (req, res) => {


  prismaClient.user.create({
    data: {
      username : Math.random().toString(),
      password : Math.random().toString()
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.get("/", (req, res) => {
  res.send("Hello from backend v4 --> enjoy!");
});

app.listen(8080);