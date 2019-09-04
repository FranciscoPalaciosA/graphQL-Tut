import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)

const typeDefs = ` 
    type Query {
        hello: String!
        name: String!
    }

`

// Resolvers

const resolvers = {
    Query: {
        hello() {
            return "Hello World!"
        },
        name() {
            return "Francisco Palacios"
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is up!")
})