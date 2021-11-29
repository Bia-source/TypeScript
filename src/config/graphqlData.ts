import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type User {
        _id: ID!
        name: String
        email: String
        active: Boolean
    }
 
    type Query{
        hello: String
        users: [User]!
    }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello World',
        users: () => [{
            _id: String(Math.random()),
            name: 'Beatriz',
            email: 'bfsantos@rd.com',
            active: true
        }]
    }
};

export const server = new ApolloServer({ typeDefs, resolvers });
