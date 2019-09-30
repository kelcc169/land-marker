import React from 'react';

import { Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Navigation = ({logout, userId}) => {
  var contents;

  if (!userId) {
    contents = (
      <>
        <Link to="/login" className="nav-link topnav">Login</Link>
        <Link to="/signup" className="nav-link topnav">Sign Up</Link>
      </>
    )
  } else {
    contents = (
      <>
        <Link to="/" className="nav-link topnav">Home</Link>
        <Link to="/create" className="nav-link topnav">Create</Link>
        <Link to="/" className="nav-link topnav" onClick={(e) => logout(e)}>Logout</Link>
      </>
    )
  }

  return(
    <nav className="justify-content-between navbar navbar-expand navbar-light bg-primary">
      <span className='navbar-brand' ><i className="fas fa-map-marked-alt" />  Land-Marker</span>
      <Nav>
        {contents}
      </Nav>
    </nav>
  )
}

export default Navigation;