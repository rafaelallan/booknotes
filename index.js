import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use('/notes', express.static('public'))
app.use('/books', express.static('public'))
app.use(bodyParser.urlencoded(import.meta.url));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Notes
app.get("/notes/new", (req, res) => {
    res.render("newnote.ejs");
});

app.get("/notes/id", (req, res) => {
    res.render("notes.ejs");
});

// ********** Books **********
app.route("/books")
    .get((req, res) => {
        res.render("books.ejs");
    })
    .post((req, res) => {
        console.log(req.body);
        res.redirect("/books");
    })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});