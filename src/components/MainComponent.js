import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Map state to props to use them in the components
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

class Main extends Component {

  constructor(props) {
    super(props);

    // Moved to reducer.js
    // this.state = {
    //   dishes: DISHES,
    //   comments: COMMENTS,
    //   leaders: LEADERS,
    //   promotions: PROMOTIONS
    // };
  }

  render() {

    const HomePage = () => {
      return(
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail
          dish={ this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0] }
          comments={ this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10)) }
        >
        </DishDetail>
      );
    }

    const AboutPage = () => {
      return(
        <About leaders={this.props.leaders}></About>
      );
    }

    return (
      <div>
        <Header></Header>
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' component={AboutPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
