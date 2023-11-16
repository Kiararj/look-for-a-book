const typeDefs = `
    type User {
        _id: ID
        name: String
        email: String
        password: String
        savedBooks: [Book] 
    }
    type Book {
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID
        user: User
      }
`;

module.exports = typeDefs;