require("dotenv").config();
import express = require("express");
import "./core/db";
import { UserCtrl } from "./controllers/UserController";
import { registerValidations } from "./validators/register";
import { passport } from "./core/passport";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get("/users", UserCtrl.index);
app.post("/register", registerValidations, UserCtrl.create);
app.get("/auth/verify", UserCtrl.verify);
app.get("/users/:id", UserCtrl.show);
app.post("/auth/login", passport.authenticate("local"), UserCtrl.afterLogin);

// app.patch("/users", UserCtrl.index);
// app.delete("/users", UserCtrl.index);

app.listen(process.env.PORT, (): void => {
  console.log("SERVER IS RUNNING ");
});
