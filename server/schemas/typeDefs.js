const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        bookCount: Int
        savedBooks: [Book] 
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookID: String!, title: String!, authors: [String], description: String, image: String, link: String): User
        removeBook(bookID: String!): User
    }
`;

module.exports = typeDefs;