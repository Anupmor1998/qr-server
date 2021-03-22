const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.get("/", function (req, res) {
  console.log(req);
});
app.post("/", function (req, res) {
  console.log(req);
});
app.post("/qrcodemsg", function (req, res) {
  console.log(req.body);
});

app.listen(3002, function () {
  console.log("3002!");
});
