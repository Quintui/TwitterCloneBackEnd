require("dotenv").config();
import express = require("express");
import "./core/db";
import { UserCtrl } from "./controllers/UserController";
import { registerValidations } from "./validators/register";

const app = express();

app.use(express.json());

app.get("/users", UserCtrl.index);
app.get("/users/verify", UserCtrl.verify);
app.post("/users", registerValidations, UserCtrl.create);
// app.patch("/users", UserCtrl.index);
// app.delete("/users", UserCtrl.index);

app.listen(process.env.PORT, (): void => {
  console.log("SERVER IS RUNNING ");
});
