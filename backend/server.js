import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import taskRoute from './routes/task.route.js'
import userRoute from './routes/user.route.js'
import timerRoute from './routes/timer.route.js' //uncommented
import timetableRoute from './routes/timetable.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const corsOptions = {
  origin: "https://studyhiveouslf6.vercel.app", // Allow frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable sending cookies
};
app.use(cors(corsOptions));


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

// app.use(
//   session({
//     store: new RedisStore({
//       client: redis,
//     }),
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
//       domain: ".studyhiveouslf6.vercel.app", // REMOVE THE TRAILING '/'
//       sameSite: "lax", // Important for CORS
//       secure: true, // Ensure HTTPS is being used
//     },
//   })
// );

  


const port = process.env.PORT;
const Mongo_URI = process.env.Mongo_URI;


// routes
app.use("/api/tasks", taskRoute)
app.use("/api/v1", userRoute)
app.use("/api/timer", timerRoute)//uncommented
app.use("/api/timetable", timetableRoute) 

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