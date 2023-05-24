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

app.get("/articles", function (req, res) {
  Article.find()
    .then((foundArticles) => res.send(foundArticles))
    .catch((err) => console.log(err));
});

app.post("/articles", function (req, res) {
  const newArticle = new Article({
    name: req.body.title,
    content: req.body.content,
  });

  newArticle.save();
});

app.listen(3000, function () {
  console.log("Listening at port 3000");
});
