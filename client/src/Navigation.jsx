import React from 'react';

import { Link } from 'react-router-dom';

const Navigation = ({logout, userId}) => {
  var contents;

  if (!userId) {
    contents = (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </>
    )
  } else {
    contents = (
      <>
        <Link to="/">Home</Link>
        <Link to="/" onClick={(e) => logout(e)}>Logout</Link>
      </>
    )
  }

  return(
    <nav>
      {contents}
    </nav>
  )
}

export default Navigation;