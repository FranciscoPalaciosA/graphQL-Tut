import { GraphQLServer } from 'graphql-yoga'

// Scalar type: String, Boolean, Int, Float, ID
 
// Type definitions (schema)

const typeDefs = ` 
    type Query {
        me: User!
        post: Post!
        users: [User!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers

const resolvers = {
    Query: {
        me(){
            return {
                id: '1364223',
                name: 'Francisco Palacios',
                email: 'frankpa97@hotmail.com',
                age: 22
            }
        },
        post(){
            return {
                id: 'Post1',
                title: 'Post Title',
                body: 'Este es el cuerpo del post',
                published: false
            }
        },
        users(parent, args, ctx, info){
            return 
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