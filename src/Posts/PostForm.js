import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    post: PropTypes.object
  };
  static defaultProps = {
    post: {},
    onSuccess: () => null
  };
  state = {
    title: this.props.post.title || "",
    body: this.props.post.body || "",
    id: this.props.post.id || ""
  };
  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };
  render() {
    const { title, body, id } = this.state;
    const { onSubmit, onSuccess } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit({
            variables: {
              title,
              body,
              id
            }
          })
            .then(() => {
              onSuccess();
            })
            .catch(e => console.log(e));
        }}
      >
        <input
          className="inputText"
          name="title"
          type="text"
          placeholder="title"
          value={title}
          onChange={this.handleInput}
        />
        <textarea
          className="inputTextArea"
          name="body"
          type="text"
          placeholder="body"
          value={body}
          onChange={this.handleInput}
        />
        <button className="submit">Submit</button>
      </form>
    );
  }
}
