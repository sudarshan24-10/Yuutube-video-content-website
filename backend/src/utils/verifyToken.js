import jwt from "jsonwebtoken";
import createError from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError.generateError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // You might want to handle the error differently, e.g., send it to the client
      console.error(err);
      return next(createError.generateError(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};


