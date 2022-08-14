const updateCache = (cache, query, addedBook) => {
  const uniqueBook = (books, newBook) => {
    if (!books.some((book) => book.id === newBook.id)) {
      return books.concat(newBook)
    }

    return books
  }

  cache.updateQuery(query, ({ allBooks }) => ({
    allBooks: uniqueBook(allBooks, addedBook),
  }))
}

export default updateCache
