import config from "config";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
// import path from "path";
import authRouter from "./authRouter.js";
import corsMiddleware from "./middleware/cors.middleware.js";
// import filepath from "./middleware/filepath.middleware.js";
import router from "./router.js";

const PORT = config.get("serverPort");
const DB_URL = config.get("dbUrl");

const app = express();

app.use(corsMiddleware);
// app.use(filepath(path.resolve(__dirname, "static")));
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api", router);
app.use("/api/auth", authRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("started " + PORT));
  } catch (e) {
    console.log(e.message);
  }
}

startApp();
