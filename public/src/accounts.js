function findAccountById(accounts, id) {
  return (result = accounts.find((account) => account.id === id));
}

function sortAccountsByLastName(accounts) {
  return (result = accounts.sort((person1, person2) =>
    person1.name.last > person2.name.last ? 1 : -1
  ));
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  books.forEach((book) => {
    let curCount = book.borrows.reduce((acc, item) => {
      if (item.id === account.id) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
    result += curCount;
  });
  return result;
}

// account id === book.borrows[0].id    &&   book.borrows.returned === false
// filter() books that checked out by each account (book.borrows.filter)
// find() author of each book that is checked out by that account
// map() them together

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

//REALLY CLOSE BUT NO CIGAR (NEED HELPER FUCTION ABOVE ^^^^ TO WORK)

function getBooksPossessedByAccount(account, books, authors) {
  let thisAuthor = [];
  let curBorrow = books.filter(
    (book) =>
      account.id === book.borrows[0].id && book.borrows[0].returned === false
  );
  //console.log(curBorrow)
  curBorrow.forEach((book) => {
    book.author = findAuthorById(authors, book.authorId);
  });
  return curBorrow;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
