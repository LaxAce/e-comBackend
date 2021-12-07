import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // if (!token) {
  //   return res.status(403).send("A token is required for authentication");
  // }
  // try {
  //   const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  //   req.user = decoded;
  // } catch (error) {
  //   res.status(401).send("Invalid Token");
  // }

  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      }
      console.log(decodedToken);
      next();
    });
  } else {
    res.redirect("/login");
  }

  // next();
};

export { verifyToken };
