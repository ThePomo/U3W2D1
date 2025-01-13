import { Component } from "react";

class CommentArea extends Component {
  state = {
    comments: [],
  };

  fetchComments = async (asin) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzg1MWFmNTM2NmU0MzAwMTU1NGZhMzMiLCJpYXQiOjE3MzY3NzY0MzcsImV4cCI6MTczNzk4NjAzN30.17wXXnPF6XzchvgfcZZCO0R4PDmOGQGWDcKl7mEZYq8";

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        this.setState({ comments: data });
      } else {
        console.log("Errore nel recupero dei commenti");
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.asin !== prevProps.asin) {
      console.log("Nuovo asin rilevato:", this.props.asin);
      this.fetchComments(this.props.asin);
    }
  }

  render() {
    return (
      <div>
        <h5>Commenti</h5>
        <ul>
          {this.state.comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.author}</strong>: {comment.comment}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CommentArea;
