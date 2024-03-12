const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
app.use(express.static('public'));
const manager = require('./Controller/manage');
const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch');

app.use(cors());
app.use(express.json());
app.use('/', manager);


const typeDefs = gql`
 type Result {
    set_num: Int
    name: String
    year:Int
    num_parts:Int
    set_img_url:String
    set_url:String
    last_modified_dt:String
 }

 type FetchData {
    count: Int
    next: String
    previous: String
    results: [Result]
 }

 type Query {
    fetchData: String
 }
`;


const resolvers = {
    Query: {
       fetchData: async () => {
         const response = await fetch('https://rebrickable.com/api/v3/lego/sets/?key=8e01e4c3a69927e435fba246410dbc0c');
         const data = await response.json();
         return JSON.stringify(data);
       },
    },
   };


   // Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });



const connecting = () => {
    const uri = `mongodb+srv://brickedSocialDB:6uLaKCS0xbOLLQM6@cluster0.waps95s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    return uri;
}

const connectDB = async () => {
    console.log('testing.....');
    const test = connecting();
    await mongoose.connect(test, { dbName: 'BrickedSocialDB' })
    console.log('connected');
}

const final = async () => {
    await connectDB()
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}${server.graphqlPath}`)
    });
}

final()
