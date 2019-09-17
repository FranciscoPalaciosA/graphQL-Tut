import { GraphQLServer } from 'graphql-yoga'

// Scalar type: String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'Francisco Palacios',
    email: 'francisco@example.com',
    age: 22
}, {
    id: '2',
    name: 'Alberto Martin',
    email: 'betomarvel@example.com'
}, {
    id: '3',
    name: 'Mauricio Siles',
    email: 'msiles@example.com'
}]

const posts = [{
    id: '11',
    title: 'Título 1',
    body: 'Body del primer post',
    published: true,
    author: '1'
}, {
    id: '12',
    title: 'Título 2',
    body: 'Body del segundo post',
    published: false,
    author: '1'
}, {
    id: '13',
    title: 'Título 3',
    body: 'Body del tercer post',
    published: true,
    author: '2'
}]

const comments = [{
    id: '21',
    text: 'Este es un comentario',
    author: '1'
}, {
    id: '22',
    text: 'Este es otro un comentario',
    author: '1'
}, {
    id: '23',
    text: 'Este también es un comentario',
    author: '2'
}, {
    id: '24',
    text: 'Este también es otro comentario',
    author: '3'
}]
 
// Type definitions (schema)

const typeDefs = ` 
    type Query {
        me: User!
        post: Post!
        comment: Comment!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
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
        comment(){
            return {
                id: 'Comment1',
                text: 'Text of a comment'
            }
        },
        users(parent, args, ctx, info){
            if(!args.query){
                return users
            } 
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info){
            if(!args.query){
                return posts
            }

            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || 
                post.body.toLowerCase().includes(args.query.toLowerCase()) 
            })

        },
        comments(parent, args, ctx, info){
            if(!args.query){
                return comments
            }

            return comments.filter((comment) => {
                return comment.text.toLowerCase().includes(args.query.toLowerCase())
            })
        }

    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is up on http://localhost:4000")
})