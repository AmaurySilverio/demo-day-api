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
    .toArray((err, letter) => {
      if (err) return console.log(err);
      res.render("index.ejs", { letter: letter });
      console.log(letter);
    });
});

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
  console.log(req.body.letters);
  db.collection("letters").findOneAndDelete(
    { letter: req.body.letters },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});
