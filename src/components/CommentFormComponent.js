import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
// import { Link } from 'react-router-dom';

// Comments form validations
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleSubmit(values) {
    this.props.postComment(this.props.dishId, values.rating, values.name, values.message);
  }

  render() {
    return(
      <React.Fragment>
        <Button color="primary" onClick={this.toggleModal} >
          <span className="fa fa-edit"></span>Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>

            <LocalForm onSubmit={(values) => this.handleSubmit(values) }>
              <Row class="form-group">
                <Label htmlFor="rating" md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" name="rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row class="form-group">
                <Label htmlFor="name" md={12}>Name</Label>
                <Col md={12}>
                  <Control.text model=".name" name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                </Col>
                <Errors className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less'
                  }}
                >
                </Errors>
              </Row>

              <Row className="form-group">
                <Label htmlFor="message" md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model=".message" name="message"
                    rows="12"
                    className="form-control">
                  </Control.textarea>
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={12}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>

            </LocalForm>

          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CommentForm;
