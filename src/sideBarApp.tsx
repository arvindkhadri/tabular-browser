import React from "react";
import { Container, Row } from "react-bootstrap";
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
          <li>
            <Link to="/dataLoader">Data loader</Link>
          </li>
        </ul>

        <hr />
        <Container fluid>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/dataViewer">
              <Row>
                <SchemaLoader read={true} />
              </Row>
            </Route>
            <Route path="/dataLoader">
              <Row>
                <SchemaLoader read={false} />
              </Row>
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to tabular.</h2>
      <span>
        Tabular is a generic data browser. One can browse all the tables under
        the public schema. A user can also insert data into a said table.
      </span>
    </div>
  );
}
