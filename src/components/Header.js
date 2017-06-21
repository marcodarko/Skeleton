import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Userbox} from "./Userbox";
import {logout} from "../actions/auth";
import './Header.scss';

class Header extends React.Component {

  render() {
    const {user, logout} = this.props;
    console.log(user);
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">VIIP</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {!user && <li><a href="/auth/google">Log in</a></li>}
              {!user && <li><NavLink to="/signup">Sign up</NavLink></li>}
              {user && <Userbox user={user} />}
              {user && <li><a onClick={logout} style={{cursor: 'pointer'}}>Log Out</a></li>}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object
};

//
export default connect(
  (state) => {
    console.log(state);
    return { user: state.auth.user }
  },
  { logout }
)(Header);