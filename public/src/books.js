function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let available = books.filter((book) => book.borrows[0].returned === true);
  let unavailable = books.filter((book) => book.borrows[0].returned === false);
  return [unavailable, available];
}

//match books.borrows.id === accounts.id
//return 10 or less
//maybe use helper function from other module without using require command

function getBorrowersForBook(book, accounts) {
  let result = [];
  for (let i = 0; i < 10 && i < book.borrows.length; i++) {
    result.push(findAccountById(accounts, book.borrows[i].id));
    result[i].returned = book.borrows[i].returned
  }
  return result
}

function findAccountById(accounts, id) {
  return (result = accounts.find((account) => account.id === id));
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
