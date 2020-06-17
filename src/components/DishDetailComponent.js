import React, { Component } from 'react';
// import { Media } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

  renderDish(dish) {
    if(dish != null){
      return(
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return(<div></div>);
    }
  }

  renderComments(dish){
    if(dish != null){
      var comments = dish.comments

      if(comments != null) {
        return(
          <ul className="list-unstyled">
            { comments.map((comment) => {
              return(
                <span>
                  <li>{ comment.comment }</li>
                  <br></br>
                  <li>--{ comment.author }, { new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date))) }</li>
                  <br></br>
                </span>
              );
            })}
          </ul>
        );
      }else {
        return <div></div>;
      }
    }else{
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            { this.renderDish(this.props.dish )}
          </div>

          <div className="col-12 col-md-5 m-1">
            <h4>
              Comments
            </h4>
            { this.renderComments(this.props.dish) }
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
