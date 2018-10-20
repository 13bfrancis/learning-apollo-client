import React, { Component } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://api-useast.graphcms.com/v1/cjnhocb7y1s5801ij2oocs0vv/master"
});

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;

// client
//   .query({
//     query: testQuery
//   })
//   .then(res => console.log(res));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={POSTS_QUERY}>
          {({ loading, data }) => {
            if (loading) return "Loading ...";
            const { posts } = data;
            return posts.map(posts => <h1 key={posts.id}>{posts.title}</h1>);
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
