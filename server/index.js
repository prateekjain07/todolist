// import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const Todo = mongoose.model("Todo", {
    text: String,
    complete: Boolean
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    todos: [Todo]
  }
  type Todo{
      id: ID!
      text: String!
      complete: Boolean!
  }
  type Mutation {
      createTodo(text: String!): Todo
      updateTodo(id: ID!, complete: Boolean!): Todo
      removeTodo(id: ID!): Todo
  }
`
 
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    todos: () => Todo.find()
  },
  Mutation: {
      createTodo: async (_, {text}) => {
          const todo = new Todo({text, complete: false});
          await todo.save().then(console.log("SAVED"));
          return todo;
      },
      updateTodo: async(_, {id, complete}) => {
        let todo = null;
        await Todo.findByIdAndUpdate(id, {complete},{new: true}, function(err, docs, res){
          if(err){
            console.log(err);
          }
          else{
            // console.log('Updated Docs: ',docs);
            todo = docs;
          }
        });
        return todo;
      },
      removeTodo: async(_, {id}) => {
        let todo = null;
        await Todo.findByIdAndRemove(id, function(err, docs, res){
          if(err){
            console.log(err);
          }
          else{
            console.log('Updated Docs: ',docs);
            todo = docs;
          }
        });
        return todo;
      }
  }
}
 
const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once("open", function(){
    server.start(() => console.log('Server is running on localhost:4000'))
})
