import express = require("express");
import { UserModel, UserSchemaInterface } from "../models/UsersModel";
import { validationResult } from "express-validator";
import { generateMD5 } from "../utils/generateHash";
import { sendMail } from "../utils/sendMail";

class UserController {
  async index(_, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();

      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: "error",
          errors: errors.array(),
        });
        return;
      }

      const data: UserSchemaInterface = {
        email: req.body.email,
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
        confirmHash: generateMD5(
          process.env.SECRET_KEY || Math.random().toString()
        ),
      };

      const user = await UserModel.create(data);

      sendMail(
        {
          emailFrom: "admin@twitter.com",
          emailTo: data.email,
          subject: "Confirmation Mail",
          html: `For confirm email click to => <a href="http://localhost:${
            process.env.PORT || 9999
          }/users/verify?hash=${data.confirmHash}"> ME;) </a>`,
        },
        (error: Error | null) => {
          if (error) {
            res.json({
              status: "error",
              message: JSON.stringify(error),
            });
          }
        }
      );

      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }
  async verify(req: express.Request, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;

      if (!hash) {
        res.status(400).send({
          status: "error",
          message: "Unavailable hash ",
        });
        return;
      }
      // @ts-ignore
      const user = await UserModel.findOne({ confirmHash: hash }).exec();

      if (user) {
        user.confirmed = true;
        await user.save();

        res.json({
          status: "success",
        });
      } else {
        res.status(404).json({ status: "error", message: "User is not found" });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }
}

export const UserCtrl = new UserController();
