import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router";

export default function TableLoader(props: { [key: string]: any }) {
  let { tableName }: { [key: string]: any } = useParams();
  const [schema, setSchema] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: {
          query: "read",
          table: tableName,
          fields: [
            {
              name: "*",
            },
          ],
        },
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setSchema(response.output);
      })
      .catch((error) => console.log(error));
  }, [tableName]);

  /*
    return a table with the response that was received from server.
  */
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {schema.length !== 0 &&
              Object.keys(schema[0]).map((scheme, index) => {
                return <th key={index}>{scheme}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {schema.length !== 0 &&
            schema.map((scheme, index) => {
              return (
                <tr key={index}>
                  {Object.values(scheme).map((val: any, index) => (
                    <td key={index}>{val}</td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
