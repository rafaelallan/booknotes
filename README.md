# BOOK NOTES
* Introduction

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credit)

## Introduction

For my learning project, I built a personal book note-taking responsive system designed to capture and organize key insights from books. 

The system allows readers to store detailed notes, rate the books, and track when they were read. Books can be sorted by rating and recency, offering an intuitive way to manage and review reading experiences. 

This project showcases the functionality of a personalized reading database, making it easier to retain and revisit the most important information from books.

## Installation

### Clone the Repository
1. Create a folder where the cloned respository will be located
2. Access the folder in the terminal
3. Execute the command ```git clone https://github.com/rafaelallan/booknotes```
4. Access the repository with ```cd booknotes```

### Create the DB
1. Install PostgreSQL
2. Import the DATABASE called booknotes located at **db** folder

### Install the dependency

Open terminal and run ```npm install``` to install all the dependecies the project requires to run.

Note: Node JS must be installed where the project will be running.

## Usage

The system is composed of three main pages:

**Home -** This page will list all the books registered, including the data read, review and summary. You can sort the books by Data Read and Rating. To see the notes of the listed books, click on the books titles. The page will render the book with summary and notes. A button called *Delete notes* is also available to delete any notes.

**New Note -** This page is where you will select the book to add new or additional notes. When the book is selected, the page will load the notes (if existing) below the form. As soon as new notes are added, the page will reload with the new note added. The books available is added through the New Book page.

**New Book -** This page contains a form to add a new book so that later new notes can be added. Below the form, all the registered books will be listed. By clicking at the title, it will show the summary of the book as well as a button called *Delete books*.

## Screenshots

**Desktop - Home**
![Desktop - Home page](/public/screenshots/desktop-home.png)

**Mobile - Home**
![Desktop - Home page](/public/screenshots/mobile-home.png)

## Credit

This system uses the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers) to retrieve book covers based on the ISBN inputed when the book is registered.

[Draw IO](https://www.drawio.com/) was used to create the wireframe. 