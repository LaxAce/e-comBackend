import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import users from "./routes/users.js";
import products from "./routes/products.js";
import carts from "./routes/carts.js";
import login from "./routes/login.js";
import auth from "./middleware/auth.js";
import notFound from "./middleware/not-found.js";
import cookieParser from "cookie-parser";

import cors from "cors";
const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/users", users);
app.use("/api/v1/products", products);
app.use("/api/v1/carts", carts);
app.use("/api/v1/login", login);

// app.get("/api/v1/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });
app.use(notFound);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.DBURI);
    app.listen(port, console.log(`we are listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
