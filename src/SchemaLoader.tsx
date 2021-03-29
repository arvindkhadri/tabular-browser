import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import FormLoader from "./FormLoader";
import TableLoader from "./TableLoader";

export default function SchemaLoader(props: { [key: string]: any }) {
  let { path, url } = useRouteMatch();

  const [schema, setSchema] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/schema`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setSchema(response.output);
      })
      .catch((error) => console.log(error));
  }, []);
  if (props.read) {
    return (
      <>
        <Col md={2} lg={2} style={{ borderRight: "2px solid" }}>
          <h4>List of tables from database</h4>
          <div style={{ height: "100vh" }}>
            <ul>
              {schema.map((scheme: any, key) => {
                return (
                  <li key={key}>
                    <Link to={`${url}/${scheme.tablename}`}>
                      {scheme.tablename}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
        <Col md={10} lg={9}>
          <div>
            <Switch>
              <Route exact path={path}>
                <h3>Please select a table.</h3>
              </Route>

              <Route path={`${path}/:tableName`}>
                <TableLoader read={props.read} />
              </Route>
            </Switch>
          </div>
        </Col>
      </>
    );
  }
  return (
    <>
      <Col md={2} lg={2} style={{ borderRight: "2px solid" }}>
        <h4>List of tables from database</h4>
        <div style={{ height: "100vh" }}>
          <ul>
            {schema.map((scheme: any, key) => {
              return (
                <li key={key}>
                  <Link to={`${url}/${scheme.tablename}`}>
                    {scheme.tablename}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Col>
      <Col md={10} lg={9}>
        <div>
          <Switch>
            <Route exact path={path}>
              <h3>Please select a table.</h3>
            </Route>

            <Route path={`${path}/:tableName`}>
              <FormLoader />
            </Route>
          </Switch>
        </div>
      </Col>
    </>
  );
}
