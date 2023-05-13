const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // this is now built into express, we won't need it in the future-
const MongoClient = require("mongodb").MongoClient; // how we connect to db

var db, collection;

const url =
  "mongodb+srv://amaurycodes:Cofwp0oLYdFZk01x@cluster0.9qj4jet.mongodb.net/aslDictionary?retryWrites=true&w=majority";
const dbName = "aslDictionary";

app.listen(3000, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("letters")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", { letters: result });
    });
});
app.get("/liveTranslation", (req, res) => {
  console.log("working");
  res.render("liveTranslation.ejs", {});
});

app.get("/study", (req, res) => {
  db.collection("letters")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("study.ejs", { letters: result });
    });
});
// app.get("/study", (req, res) => {
//   db.collection("letters")
//     .find()
//     .toArray((err, result) => {
//       if (err) return console.log(err);
//       res.render("study.ejs", { deck: result });
//     });
// });
app.get("/signUp", (req, res) => {
  console.log("working");
  res.render("signUp.ejs", {});
});
app.get("/about", (req, res) => {
  console.log("working");
  res.render("about.ejs", {});
});
app.get("/contact", (req, res) => {
  console.log("working");
  res.render("contact.ejs", {});
});
app.get("/landingPage", (req, res) => {
  console.log("working");
  res.render("landingPage.ejs", {});
});
app.post("/deckCards", (req, res) => {
  let deckName = req.body.deckName;
  let date = Date();
  //.replace(/\s/g, "");
  db.collection("letters").insertOne(
    { deck: deckName, letter: "", date, deleted: false },
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/study");
    }
  );
});
// });app.post("/deckCards", (req, res) => {
//   let letter = req.body.letters;
//   //.replace(/\s/g, "");
//   letter = letter.toLowerCase();
//   db.collection("letters").insertOne({ letter: letter }, (err, result) => {
//     if (err) return console.log(err);
//     console.log("saved to database");
//     res.redirect("/study");
//   });
//});
app.post("/letters", (req, res) => {
  let letter = req.body.letters;
  //.replace(/\s/g, "");
  letter = letter.toLowerCase();
  db.collection("letters").insertOne({ letter: letter }, (err, result) => {
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});

app.delete("/deletePost", (req, res) => {
  console.log(req.body);
  db.collection("letters").findOneAndDelete(
    { letter: req.body.letter },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});
