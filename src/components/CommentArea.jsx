import { Component } from "react";
import { ListGroup } from "react-bootstrap";

class CommentArea extends Component {
  state = {
    comments: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.book !== this.props.book) {
      this.fetchComments();
    }
  }

  fetchComments = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.book}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzg1MWFmNTM2NmU0MzAwMTU1NGZhMzMiLCJpYXQiOjE3MzY3NzY0MzcsImV4cCI6MTczNzk4NjAzN30.17wXXnPF6XzchvgfcZZCO0R4PDmOGQGWDcKl7mEZYq8",
          },
        }
      );

      if (response.ok) {
        const comments = await response.json();
        this.setState({ comments });
      } else {
        console.log("Errore nel recupero dei commenti");
      }
    } catch (error) {
      console.error("Errore nella fetch:", error);
    }
  };

  render() {
    return (
      <ListGroup>
        {this.state.comments.length > 0 ? (
          this.state.comments.map((comment) => (
            <ListGroup.Item key={comment._id}>
              <strong>{comment.author}</strong>: {comment.comment}
            </ListGroup.Item>
          ))
        ) : (
          <p>Nessun commento disponibile</p>
        )}
      </ListGroup>
    );
  }
}

export default CommentArea;
