import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
  if(dish != null){
    return(

      <div className="col-6 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return(<div></div>);
  }
}

function RenderComments({comments}) {
  return(
    <div className="col-6 col-md-5 m-1">
      <h1>Comments</h1>
      <ul className="list-unstyled">
        { comments.map((comment) => {
          return(
            <span key={comment.id}>
              <li>{ comment.comment }</li>
              <br></br>
              <li>--{ comment.author }, { new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date))) }</li>
              <br></br>
            </span>
          );
        })}
      </ul>
    </div>
  );
}

const DishDetail = (props) => {
  if (props.dish != null ) {
    return (
      <div className="container">
        <div className="row">
          <RenderDish dish={props.dish}></RenderDish>
          <RenderComments comments={props.dish.comments}></RenderComments>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default DishDetail;
