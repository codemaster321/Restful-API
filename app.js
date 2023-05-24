const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

// const article1 = new Article({
//   title: "this is title 1",
//   content: "this is content 1",
// });

// article1.save().then(() => console.log("Stuff happens"));

app.listen(3000, function () {
  console.log("Listening at port 3000");
});
