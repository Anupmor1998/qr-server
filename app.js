const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
var QRCode = require("qrcode-svg");
var uuid = require("node-uuid");
const app = express();

app.use(
  cors({
    origin: "https://qr-generator-v1.netlify.app",
    // origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/email", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/email.html"));
});

app.post("/qrcodemsg", function (req, res) {
  console.log(req.body);
  var qrcode = new QRCode({
    content: req.body.text,
    padding: 4,
    width: 256,
    height: 256,
    color: "#023e8a",
    background: "#ffffff",
    ecl: "M",
  });

  qrcode.save("public/images/sample.svg", function (error) {
    if (error) throw error;
    console.log("Done!");
  });
  res.send("/images/sample.svg");
});

app.post("/qrcodemail", function (req, res) {
  console.log(req);
  var qrcode = new QRCode({
    content:
      "mailto:" +
      req.body.mail +
      "?subject=" +
      req.body.subject +
      "&body=" +
      req.body.message,
    padding: 4,
    width: 256,
    height: 256,
    color: "#023e8a",
    background: "#ffffff",
    ecl: "M",
  });

  qrcode.save("public/images/qrmail.svg", function (error) {
    if (error) throw error;
    console.log("Done!");
  });
  res.send("/images/qrmail.svg");
});

app.get("/download", (req, res) => {
  res.download(__dirname + "/public/images/sample.svg");
});

app.get("/downloadMail", (req, res) => {
  res.download(__dirname + "/public/images/qrmail.svg");
});

app.listen(process.env.PORT || 3002, function (req, res) {
  console.log("App listening to post 3002");
});
