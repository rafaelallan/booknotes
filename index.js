import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
// app.use(express.static(__dirname, "../public"));
app.use('/notes', express.static('public'))
app.use('/books', express.static('public'))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/notes/new", (req, res) => {
    res.render("newnote.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});