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



async function getBooks(){
    let result;
    try {
        result = await db.query("SELECT * FROM books");
    } catch (err) {
        console.error(err.stack);
    }
    return result;
}


app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Notes
app.get("/notes/new", async (req, res) => {

    let books = await getBooks();

    res.render("newnote.ejs", {
        books: books.rows
    });

});

app.route("/notes/new")
    .get(async(req, res) => {
        let books = await getBooks();

        console.log("Mine: " + books.rows);

        res.render("newnote.ejs", {
            books: books.rows
        });
    })
    .post(async(req, res) => {
        console.log(req.body);
    })


app.get("/notes/id", (req, res) => {
    res.render("notes.ejs");
});



app.route("/books")
    .get(async(req, res) => {

        let books = await getBooks();

        res.render("books.ejs", {
            books: books.rows
        });
    })
    .post(async (req, res) => {
        const bookTitle = req.body.bookTitle;
        const actorName = req.body.actorName;
        const isbn = Number(req.body.isbn);
        const summary = req.body.summary;

        try {
            await db.query("INSERT INTO books (title, summary, actor, isbn) VALUES ($1, $2, $3, $4)",[bookTitle, summary, actorName, isbn]);
        } catch (err) {
            console.error(err.stack);
        };

        res.redirect("/books");
    })

// db.end();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});