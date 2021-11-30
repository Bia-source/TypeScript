import { ApolloServer, gql } from "apollo-server";
import e from "express";
import { container } from "tsyringe";
import { getUserByEmail } from "../modules/accounts/resolver/querys/getUserQuery";
import { CreateUserService } from "../modules/accounts/services/CreateUserService";
import { GetUserService } from "../modules/accounts/services/GetUsersService";

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
       users(name: String!, email: String!, password: String!, driver_license: String!, avatar_url: String): User!
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
       users: (_,args) => {
            const { name, email, password, driver_license, avatar_url } = args;
            const createUserService = container.resolve(CreateUserService);
            return createUserService.execute({ name, email, password, driver_license, avatar_url });
        }
    }
};

export const server = new ApolloServer({ typeDefs, resolvers });
