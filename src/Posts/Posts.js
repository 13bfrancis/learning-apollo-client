import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  render() {
    return (
      <div className="homeScreen">
        <ul>
          <li>
            <Link to={"post/new"}>
              <button className="newPost">Add Post</button>
            </Link>
          </li>
          <Query query={POSTS_QUERY}>
            {({ loading, data, fetchMore }) => {
              if (loading) return "Loading ...";
              const { posts } = data;
              return (
                <>
                  {posts.map(posts => (
                    <li key={posts.id}>
                      <Link to={`/post/${posts.id}`}>{posts.title}</Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() =>
                        fetchMore({
                          variables: {
                            skip: posts.length
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              posts: [...prev.posts, ...fetchMoreResult.posts]
                            });
                          }
                        })
                      }
                    >
                      Load More
                    </button>
                  </li>
                </>
              );
            }}
          </Query>
        </ul>
      </div>
    );
  }
}

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 4, skip: $skip) {
      id
      title
      body
    }
  }
`;
