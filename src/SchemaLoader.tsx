import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import TableLoader from "./TableLoader";

export default function SchemaLoader() {
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
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:tableName`}>
          <TableLoader />
        </Route>
      </Switch>
    </>
  );
}
