import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SchemaLoader from "./SchemaLoader";

export default function NestingRoutes() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dataViewer">Data viewer</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dataViewer">
            <SchemaLoader />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
