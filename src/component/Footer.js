import React from 'react';

import {Link} from "react-router";

class Footer extends React.Component {
  render () {
    return(
      <div>
        <Link to = "login" activeStyle= {{color:"#af879a"}}>
        <br/>Login</Link>
        <Link to = "home" activeStyle= {{color:"#af879a"}}>
        <br/>Home</Link>
      </div>
    )
  }
}

export default Footer;
