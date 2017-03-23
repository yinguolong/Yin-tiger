import React from "react";
import {Router,Route,browserHistory,IndexRoute} from "react-router";
import App from "./App.js";
import Shop from "./component/Shop.js";
import Home from "./component/Home.js";

export default function(){
  return(
  <Router history={browserHistory}>
    <Route path="/" component = {App}>
      <IndexRoute component={Home} />
      <Route path="/shop" component = {Shop}/>
    </Route>
  </Router>
  )
}
