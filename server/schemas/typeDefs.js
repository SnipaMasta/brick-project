const typeDefs = `#graphql
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
}

type Auth {
    token: ID!
    user: User
}

type Review {
    _id: ID!
    reviewText: String!
    reviewAuthor: String!
    createdAt: String!
    updatedAt: String!
    legoSet: String!
    reviewScore: Int!
}

type Query {
    selectedSet(legoSet: String!): [Review]
    allSets: [Review] #homepage, only show stars
    me: User
    
}


`;




module.exports = typeDefs;