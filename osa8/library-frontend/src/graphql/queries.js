import { gql } from "@apollo/client"

const AllAuthors = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

const AllBooks = gql`
  query AllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const AddBook = gql`
  mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const EditBirthDate = gql`
  mutation Mutation($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`

const Login = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const Me = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`

const BookAdded = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }`

export default {
  AllAuthors, AllBooks, AddBook, EditBirthDate, Login, Me, BookAdded,
}
