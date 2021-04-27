import * as mongoose from "mongoose";

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/twitter",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connect");
});
db.on("error", console.error.bind(console, "connection error"));

export { db, mongoose };