import { Component } from "react";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";
import { Col, Form, Row } from "react-bootstrap";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedBookAsin: null,
  };

  handleBookSelection = (asin) => {
    this.setState({ selectedBookAsin: asin });
  };

  render() {
    return (
      <Row className="mt-5">
        <Col xs={12} md={8}>
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Control
                  type="search"
                  placeholder="Cerca un libro"
                  value={this.state.searchQuery}
                  onChange={(e) =>
                    this.setState({ searchQuery: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2">
            {this.props.books
              .filter((b) =>
                b.title
                  .toLowerCase()
                  .includes(this.state.searchQuery.toLowerCase())
              )
              .map((b) => (
                <Col xs={12} md={4} key={b.asin}>
                  <SingleBook
                    book={b}
                    isSelected={this.state.selectedBookAsin === b.asin}
                    onBookSelect={this.handleBookSelection}
                  />
                </Col>
              ))}
          </Row>
        </Col>

        <Col xs={12} md={4}>
          {this.state.selectedBookAsin ? (
            <CommentArea book={this.state.selectedBookAsin} />
          ) : (
            <h5 className="text-center">
              Seleziona un libro per vedere i commenti
            </h5>
          )}
        </Col>
      </Row>
    );
  }
}

export default BookList;
