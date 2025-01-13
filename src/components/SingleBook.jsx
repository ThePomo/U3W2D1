import { Card } from "react-bootstrap";
import { Component } from "react";

class SingleBook extends Component {
  handleClick = () => {
    this.props.onBookSelect(this.props.book);
  };

  render() {
    const { book, isSelected } = this.props;

    return (
      <Card
        onClick={this.handleClick}
        style={{
          border: isSelected ? "3px solid red" : "none",
          cursor: "pointer",
        }}
        className="h-100"
      >
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{book.title}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default SingleBook;
