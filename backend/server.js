import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import taskRoute from './routes/task.route.js'
import userRoute from './routes/user.route.js'
// import timerRoute from './routes/timer.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser())

const port = process.env.PORT;
const Mongo_URI = process.env.Mongo_URI;

// routes
app.use("/api/tasks", taskRoute)
app.use("/api/v1", userRoute)
// app.use("/api/timer", timerRoute)

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

