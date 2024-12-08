const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const taskRoute = require('./routes/task.route.js')


dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;
const Mongo_URI = process.env.Mongo_URI;

// routes
app.use("/api/tasks", taskRoute)

// database test
app.get("/", (req, res) => {
  res.send("Hello from Express server");
});

// database connection
mongoose
  .connect(Mongo_URI, {})
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
