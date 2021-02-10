const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const path = require("path");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`server running on port : ${port}`);
  }
});
