import { ApolloServer, gql } from "apollo-server";
import { createUserMutation } from "../modules/accounts/resolver/mutations/createUserMutation";
import { getUserByEmail } from "../modules/accounts/resolver/querys/getUserQuery";

const typeDefs = gql`
    type User {
        id: String!
        name: String!
        email: String!
        password: String!
        driver_license: String!
        isAdmin: Boolean
        create_at: String
        avatar_url: String
    }
 
    type Query{
        hello: String
        getUserByEmail(email: String): User!
    }

    type Mutation {
       createUser(name: String!, email: String!, password: String!, driver_license: String!, avatar_url: String): User!
    }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello World',
        getUserByEmail: async (_, args) => {
            const { email } = args;
            return getUserByEmail(email);
        }
    },
    Mutation: {
       createUser: async (_,args) => {
            const { name, email, password, driver_license, avatar_url } = args;
            return await createUserMutation(name, email, password, driver_license, avatar_url);
        }
    }
};

export const server = new ApolloServer({ typeDefs, resolvers });
