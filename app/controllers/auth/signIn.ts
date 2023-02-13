import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const signIn: RequestHandler = (req, res, next) => {
  try {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) return res.status(400).json(err);

      req.login(user, { session: false }, (err) => {
        if (err) return res.status(400).json(err);

        if (process.env.JWT_SECRET_KEY !== undefined) {
          const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
          });

          return res.json({ username: user.name, token });
        }
      });
    })(req, res);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default signIn;
