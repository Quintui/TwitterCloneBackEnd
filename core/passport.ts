import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel, UserSchemaInterface } from "../models/UsersModel";
import { generateMD5 } from "../utils/generateHash";
const JWStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new LocalStrategy(
    async (username, password, done): Promise<void> => {
      try {
        const user = await UserModel.findOne({
          $or: [{ email: username }, { username }],
        }).exec();

        if (!user) {
          done(null, false);
        }

        if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new JWStrategy(
    {
      secretOrKey: process.env.SECRET_KEY || "123",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (payload, done) => {
      try {
        return done(null, payload.user);
      } catch (error) {
        done(error);
        console.log(error);
      }
    }
  )
);

passport.serializeUser(function (user: UserSchemaInterface, done) {
  done(null, user?._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user.toJSON());
  });
});

export { passport };
