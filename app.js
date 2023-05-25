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

/////Request targetting /articles
app
  .route("/articles")
  .get(function (req, res) {
    Article.find()
      .then((foundArticles) => res.send(foundArticles))
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save().then(() => res.send("posted"));
  })
  .delete((req, res) => {
    Article.deleteMany()
      .then(() => console.log("Deleted all articles"))
      .catch((err) => console.log(err));
  });

/////Requests tagretting  specific route

app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.find({ title: req.params.articleTitle })
      .then((foundArticle) => res.send(foundArticle))
      .catch((err) => console.log(err));
  })
  .put((req, res) => {
    Article.replaceOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true }
    )
      .then(() => res.send("successfully replaced the article, surrrr"))
      .catch((err) => res.send(err));
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      {
        $set: req.body,
      }
    ).then(() => res.send("patched successfully daddyy"));
  })
  .delete((req, res) => {
    Article.deleteMany({
      title: req.params.articleTitle,
    }).then(() => res.send("Deleted him sir, now give me my payment"));
  });

app.listen(3000, function () {
  console.log("Listening at port 3000");
});
