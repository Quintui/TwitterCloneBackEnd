import { body } from "express-validator";

export const registerValidations = [
  body("email", "Email is required")
    .isEmail()
    .withMessage("Incorrect Email or Password")
    .isLength({
      min: 10,
      max: 50,
    })
    .withMessage("Symbols limit from 10 to 50 "),
  body("fullname", "FullName is required")
    .isString()
    .isLength({
      min: 2,
      max: 20,
    })
    .withMessage("Symbols limit from 2 to 20 "),
  body("username", "Username is required")
    .isString()
    .isLength({
      min: 2,
      max: 20,
    })
    .withMessage("Symbols limit from 2 to 20 "),

  body("password", "Password is required")
    .isString()
    .isLength({
      min: 4,
    })
    .withMessage(" minimum  symbols is 4 "),
  body("password", "Password is required")
    .isString()
    .isLength({
      min: 4,
    })
    .withMessage(" minimum  symbols is 4 ")
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error("Password mismatch");
      } else {
        return value;
      }
    }),
];
