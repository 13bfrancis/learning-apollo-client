import React, { Component } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://api-useast.graphcms.com/v1/cjnhocb7y1s5801ij2oocs0vv/master"
});

const testQuery = gql`
  {
    posts {
      id
      title
      body
    }
  }
`;

client
  .query({
    query: testQuery
  })
  .then(res => console.log(res));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <h1>hello world</h1>
      </ApolloProvider>
    );
  }
}

export default App;
