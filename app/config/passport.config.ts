import dotenv from "dotenv";
import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import { User } from "../models/user";

dotenv.config();

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = passportLocal.Strategy;

export default () => {
  //Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        return await User.findOne({
          where: { email, password },
        })
          .then((user: any) => {
            if (!user) {
              return done(null, false, {
                message: "Incorrect email or password.",
              });
            }
            return done(null, user, { message: "Logged In Successfully" });
          })
          .catch((err) => done(err));
      }
    )
  );

  //JWT Strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
      },
      async function (jwtPayload, done) {
        return await User.findByPk(jwtPayload.id)
          .then((user: any) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );
};
