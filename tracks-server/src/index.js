require("./model/user-model");
require("./model/Tracks");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoutes");
const requireAuth = require("../src/middlewares/requireAuth");
const trackRoutes = require("../src/routes/trackRoutes");

const mongoUri =
  "mongodb+srv://tracks:tracks@cluster0-zps0s.mongodb.net/tracks?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(authRouter);
app.use(trackRoutes);

mongoose.connection.on("connected", () => {
  console.log("connected to mongoo");
});

mongoose.connection.on("error", (err) => {
  console.log("error while connecting", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening to port 300");
});
