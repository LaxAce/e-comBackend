import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import users from "./routes/users.js";
import notFound from "./middleware/not-found.js";
const app = express();
dotenv.config();

// middleware
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("hello world");
});

// routes
app.use("/api/v1/users", users);

app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.DBURI);
    app.listen(port, console.log(`we are listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
