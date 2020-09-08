import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect, Kitten } from './database/database';

dotenv.config();
const app = express();
const corsOptions = {
  origin: "*",
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  Kitten.find((err, kittens) => {
    res.send(kittens)
  })
});

app.get("/add/:name", (req, res) => {
  const silence = new Kitten({ name: req.params.name });
  silence.save()
  res.send(silence);
});

app.get("/cleanup", (req, res) => {
  Kitten.deleteMany({}, (err) => {
    if (err)
      console.error(err);
  })
  res.send("Done");
});


const APP_PORT = 8080;
// start the Express server
app.listen(APP_PORT, () => {
  connect()
  console.log(`server started at http://localhost:${process.env.SERVER_PORT || APP_PORT}`);
});