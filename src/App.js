import React, { Component } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import Post from "./Posts/Post";
import Posts from "./Posts/Posts";
import NewPost from "./Posts/NewPost";

const defaultState = {
  isEditMode: false
};

const client = new ApolloClient({
  uri: "https://api-useast.graphcms.com/v1/cjnhocb7y1s5801ij2oocs0vv/master",
  clientState: {
    defaults: defaultState,
    resolvers: {}
  }
});

// client
//   .query({
//     query: testQuery
//   })
//   .then(res => console.log(res));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <>
            <div className="App-header">
              <Link to={"/"}>
                <p>Home Page</p>
              </Link>
            </div>

            <Switch>
              <Route exact path="/" component={Posts} />
              <Route exact path="/post/new" component={NewPost} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
