const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          id: {
            type: GraphQLID
          }
        }
      }
    }
  })
})