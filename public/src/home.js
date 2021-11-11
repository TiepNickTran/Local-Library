function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = 0;
  books.forEach((book) => {
    if (book.borrows[0].returned === false) result++;
  });
  return result;
}

function getMostCommonGenres(books) {
  let listOfGenre = {};
  books.forEach((book) => {
    let currentGenre = book.genre;
    if (listOfGenre[currentGenre]) {
      listOfGenre[currentGenre]++;
    } else {
      listOfGenre[currentGenre] = 1;
    }
    return listOfGenre;
  });
  let arrayOfGenre = Object.keys(listOfGenre).map((key) => {
    return { name: key, count: listOfGenre[key] };
  });
  arrayOfGenre.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));
  return arrayOfGenre.slice(0, 5);
}

// get number of times books have been borrowed by book.borrows.length
// sort that result from highest to lowest
// display top 5 only even if there is a tie
function getMostPopularBooks(books) {
  let borrowCounts = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });
  borrowCounts.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));
  //console.log(borrowCounts)
  return borrowCounts.slice(0, 5);
}

function getBorrowsCountForEachBook(books) {
  let borrowCounts = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });
  borrowCounts.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));
  return borrowCounts;
}

/* 1.loops thru all the books of the same author and add up
all the times that one book has been checked out
  2. sort that result from highest counter
  3. get name of that counter and format the output to match
  with the requirement*/
function getMostPopularAuthors(books, authors) {
  let authorBookCount = authors.map((author) => {
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
      id: author.id,
    };
  });
  let popularBooks = getTotalBorrow(books);
  authorBookCount.forEach((author) => {
    let authorBooks = popularBooks.filter(
      (book) => book.authorId === author.id
    );
    author.count = authorBooks.reduce((total, current) => {
      return total + current.count;
    }, 0);
  })
  let authorsSorted = authorBookCount
    .sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1))
    .slice(0, 5);
  return authorsSorted.map((author) => {
    return { name: author.name, count: author.count };
  });
}

function getTotalBorrow(books) {
  let result = [];
  books.forEach((book) => {
    result.push({
      name: book.title,
      count: book.borrows.length,
      authorId: book.authorId,
    });
  });
  return result
}

/* confused and tried 2 diff ways
  
  function getMostPopularAuthors(books, authors){
  let booksFromSameAuthor = {};
  let result = 0;
  books.forEach((book) => {
    let currentAuthor = book.authorId;
    if (booksFromSameAuthor[currentAuthor]) {
      result += book.borrows.length;
    } else {
      result = book.borrows.length;
    }
    return currentAuthor
  });
  console.log(result);
  console.log(currentAuthor);
  return result;
}

 HEAD ACHE
 let result = 0
 let checkoutCount = getBorrowsCountForEachBook(books).reduce((acc, book => {
   if (acc[book.authorId]) {
    result += book
   }
 },0)
 console.log(checkoutCount)
*/

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
