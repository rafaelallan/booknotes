import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "booknotes",
    password: "ImDBA",
    port: 5432
})

db.connect();

app.use(express.static("public"));
app.use('/notes', express.static('public'))
app.use('/books', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

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
// app.get("/books", (req, res) => {
//     res.render("books.ejs");
// });

// app.post("/books", (req, res) => {
//     res.render("books.ejs");
// });


app.route("/books")
    .get((req, res) => {
        res.render("books.ejs");
    })
    .post(async (req, res) => {
        const bookTitle = req.body.bookTitle;
        const actorName = req.body.actorName;
        const isbn = Number(req.body.isbn);
        const summary = req.body.summary;

        console.log(req.body);
        res.redirect("/books");

        try {
            await db.query("INSERT INTO books (title, summary, actor, isbn) VALUES ($1, $2, $3, $4)",[bookTitle, summary, actorName, isbn]);
        } catch (err) {
            console.error(err.stack);
        };
    })

// db.end();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});