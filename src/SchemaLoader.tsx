import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import FormLoader from "./FormLoader";
import TableLoader from "./TableLoader";

export default function SchemaLoader(props: { [key: string]: any }) {
  let { path, url } = useRouteMatch();

  const [schema, setSchema] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/schema", {
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

        <Switch>
          <Route exact path={path}>
            <h3>Please select a table.</h3>
          </Route>

          <Route path={`${path}/:tableName`}>
            <TableLoader read={props.read} />
          </Route>
        </Switch>
      </>
    );
  }
  return (
    <>
      <ul>
        {schema.map((scheme: any, key) => {
          return (
            <li key={key}>
              <Link to={`${url}/${scheme.tablename}`}>{scheme.tablename}</Link>
            </li>
          );
        })}
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a table.</h3>
        </Route>

        <Route path={`${path}/:tableName`}>
          <FormLoader />
        </Route>
      </Switch>
    </>
  );
}
