import React from "react";
import ReactDOM from "react-dom";
import domready from "domready";
import {browserHistory, Router, Route, IndexRoute} from "react-router";

import App from "./app";
import IndexPage from "./components/pages/index";
import WorkoutPage from "./components/pages/workout";
import StatsPage from "./components/pages/stats";
import Store from "./stores/store";

var routes, Handler;

routes = (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage} />
    <Route path="/workout" component={WorkoutPage} />
    <Route path="/stats" component={StatsPage} />
  </Route>
);

function render () {
  ReactDOM.render(
    <Router history={browserHistory} routes={routes}/>,
    document.getElementById("main")
  );
}

Store.data.on("next-animation-frame", render);
domready(render);