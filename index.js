import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

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

// Search for all the books in the DB
async function getBooks() {
  let result;
  try {
    result = await db.query("SELECT * FROM books");
  } catch (err) {
    console.error(err.stack);
  }
  return result;
}

// -------------------------- Handle the index/home requests --------------------------
app
  .route("/")
  .get(async (req, res) => {
  let books = await getBooks();

  // Used to obtain the last date read of the notes and assign to the books object to show on the page
  let result;
  var booksRead = [];

  try {
    let imagePath;

    for (let i = 0; i < books.rows.length; i++) {

      result = await db.query(
        `SELECT 
              books.id, 
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

      // Retrieve book cover from external source
      try {
        const response = await axios.get(
          `https://covers.openlibrary.org/b/isbn/${books.rows[i].isbn}.json`
        );
        imagePath = response.data.source_url;

        // If the liberay does not find the cover, we add one local image
        if (response.data.source_url === "") {
          imagePath = "/images/cover_unavailable.jpg";
        }
      } catch (error) {
        console.error("Failed to make request:", error.message);
        imagePath = "/images/cover_unavailable.jpg";
      }

      // When the search brings no result (Book just added with no notes),
      // the date and rating are set to - (hyphen)
      if (result.rows[0] === undefined) {
        booksRead.push({
          id: books.rows[i].id,
          title: books.rows[i].title,
          isbn: books.rows[i].isbn,
          last_value: "-",
          rating: "-",
          summary: books.rows[i].summary,
          image: imagePath,
        });
      } else {
        booksRead.push({
          id: result.rows[0].id,
          title: result.rows[0].title,
          isbn: result.rows[0].isbn,
          last_value: result.rows[0].last_value,
          rating: result.rows[0].rating,
          summary: result.rows[0].summary,
          image: imagePath,
        });
      }
      // console.log(booksRead);
    }    
    res.render("index.ejs", {
      books: booksRead,
    });
  } catch (err) {
    console.error(err.stack);
  }
});

// -------------------------- Handle New Notes --------------------------
app
  .route("/notes/new")
  .get(async (req, res) => {
    let books = await getBooks();

    res.render("newnote.ejs", {
      books: books.rows,
    })
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

// In Progress - Creating to list all the notes in New Note page.
app
  .route("/notes/list")
  .get(async (req, res) => {
    const books = await getBooks();
    const id = parseInt(req.query.hiddenBookID);

    let result;
    try {
      result = await db.query(`SELECT books.id, title, summary, notes
                                FROM books
                                JOIN notes
                                ON books.id = book_id
                                AND books.id = ${id}`);

      // console.log(result.rows);

      if(result.rows != "") {
        res.render("newnote.ejs", {
          notes: result.rows,
          books: books.rows,
          hiddenBookID: id
        });
      } else {
        res.render("newnote.ejs", {
          books: books.rows,
          hiddenBookID: id
        });
      }


    } catch (err) {
      console.error(err.stack);
    }
  })

// -------------------------- Show selected book notes --------------------------
app
  .route("/notes/:id")
  .get(async (req, res) => {
  const id = parseInt(req.params.id);

  let result;
  try {
    result = await db.query(`SELECT books.id, title, summary, notes
                              FROM books
                              JOIN notes
                              ON books.id = book_id
                              AND books.id = ${id}`);
    
    // if there is no book with notes, basic book search is made
    if (result.rows == ""){
      result = await db.query(`SELECT id, title, summary
                                FROM books
                                WHERE id = ${id};`);
    }

    res.render("notes.ejs", {
      notes: result.rows
    });
  } catch (err) {
    console.error(err.stack);
  }
  })
  .post(async (req, res) => {
    console.log(req.body);
});

// -------------------------- Show all the book as well as add new books --------------------------
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
