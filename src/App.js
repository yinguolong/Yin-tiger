import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from "./component/Header.js";
import {Link} from "react-router";
// import Footer from "./component/Footer.js";

class App extends React.Component {
  render () {
    return(
      <div>
        <MuiThemeProvider>
          <Header/>
        </MuiThemeProvider>
        <Link to = "/">home</Link>
        <Link to = "shop">shop</Link>
        {this.props.children}
      </div>
    )
  }
}

export default App;
