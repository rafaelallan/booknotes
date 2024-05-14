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
  port: 5432,
});

db.connect();

app.use(express.static("public"));
app.use("/notes", express.static("public"));
app.use("/books", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

async function getBooks() {
  let result;
  try {
    result = await db.query("SELECT * FROM books");
  } catch (err) {
    console.error(err.stack);
  }
  return result;
}

// app.get("/", (req, res) => {
//     let books = getBooks();

//     console.log(books);
//     res.render("index.ejs");
// });

app.route("/").get(async (req, res) => {
  let books = await getBooks();

  // Used to obtain the last date read of the notes and assign to the books object to show on the page
  let result;
  var booksRead = [];

  try {
    for (let i = 0; i < books.rows.length; i++) {
      result = await db.query(
        `SELECT 
            title,
            isbn,
            LAST_VALUE(date_read) OVER ( ORDER BY notes.id DESC), -- Captures the last date of notes when the book was read
            rating,
            summary
        FROM books
        JOIN notes
        ON books.id = book_id
        AND books.id = $1
        LIMIT 1;`,
        [books.rows[i].id]
      );

      //   console.log(result.rows[0]);

      // When the search brings no result (Book just added with no notes),
      // the date and rating are set to - (hyphen)
      if (result.rows[0] === undefined) {

        booksRead.push({
          title: books.rows[i].title,
          isbn: books.rows[i].isbn,
          last_value: "-",
          rating: "-",
          summary: books.rows[i].summary,
        });
      } else {
        booksRead.push(result.rows[0]);
      }
    }
    // console.log(booksRead);
    res.render("index.ejs", {
      books: booksRead,
    });
  } catch (err) {
    console.error(err.stack);
  }
});

// Notes
app
  .route("/notes/new")
  .get(async (req, res) => {
    let books = await getBooks();

    res.render("newnote.ejs", {
      books: books.rows,
    });
  })
  .post(async (req, res) => {
    console.log(req.body);
    const bookID = req.body.book;
    const readDate = req.body.readDate;
    const rating = req.body.rating;
    const note = req.body.note;

    try {
      await db.query(
        "INSERT INTO notes (date_read, rating, notes, book_id) VALUES ($1, $2, $3, $4)",
        [readDate, rating, note, bookID]
      );
      res.redirect("/");
    } catch (err) {
      console.error(err.stack);
    }
  });

app.get("/notes/id", (req, res) => {
  res.render("notes.ejs");
});

app
  .route("/books")
  .get(async (req, res) => {
    let books = await getBooks();

    res.render("books.ejs", {
      books: books.rows,
    });
  })
  .post(async (req, res) => {
    const bookTitle = req.body.bookTitle;
    const actorName = req.body.actorName;
    const isbn = Number(req.body.isbn);
    const summary = req.body.summary;

    try {
      await db.query(
        "INSERT INTO books (title, summary, actor, isbn) VALUES ($1, $2, $3, $4)",
        [bookTitle, summary, actorName, isbn]
      );
    } catch (err) {
      console.error(err.stack);
    }

    res.redirect("/books");
  });

// db.end();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
