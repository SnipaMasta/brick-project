const typeDefs = `#graphql
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    profilePic: String
    reviews: [Review]
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
    getUser(id:ID!): User
    selectedSet(legoSet: String!): [Review]
    allSets: [Review] #homepage, i want to only show stars
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(legoSet: String!, reviewText: String!, reviewScore: Int!): Review
    editReview(reviewId: ID!, reviewText: String!): Review
    deleteReview(reviewId: ID!): Review
}


`;




module.exports = typeDefs;