import React from "react";
import PropTypes from 'prop-types'
// components imports
import Header from './components/Header';
import Drawer from './components/Drawer';
import Login from './components/Login';
import Footer from './components/Footer';
import Results from './components/Results';
import {checkLoginStatus} from './actions/auth';
import { connect } from 'react-redux';
// import backgroud from './assets/images/example.jpg';
import {Search} from "./components/Search";
import { Route } from 'react-router';

class App extends React.Component{

  constructor(props) {
    super(props);
    props.checkLoginStatus(); // first action dispatch of our app (except routing)
  }

  render() {
    return (
      <div className='root'>
        <Header />
        <main>
          <Drawer />
          <Route exact path="/" component={Search} />
          <Route path="/login" component={Login} />
        </main>
        <Footer />
      </div>
    );
  }
}
App.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired
};

export default connect(
  // ({routing}) => ({location: routing.location}), // NavLink update
  null,
  { checkLoginStatus }
)(App);