import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useParams } from "react-router";

export default function FormLoader() {
  let { tableName }: { [key: string]: any } = useParams();
  const [schema, setSchema] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: {
          query: "read",
          table: "information_schema.columns",
          fields: [
            {
              name: "table_name",
            },
            {
              name: "column_name",
            },
            {
              name: "data_type",
            },
          ],
          where: [
            {
              table_name: { _eq: tableName },
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

  function createRow(event: any) {
    let formData: any, formDataObj: any;
    if (event) {
      console.log("hello");
      event.preventDefault();
      formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      formDataObj = Object.keys(data)
        .map((key) => {
          if (data[key]) {
            return {
              name: key,
              value: data[key],
            };
          }
          return false;
        })
        .filter((item) => item);
      console.log(data);
      console.log(formDataObj);
    }

    fetch(`${process.env.REACT_APP_API_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: {
          query: "write",
          table: tableName,
          fields: formDataObj,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          alert("Data loaded successfully");
          return response.json();
        } else {
          return response.json().then((json) => {
            throw json;
          });
        }
      })
      .catch((error) => {
        console.log(error.err);
        alert(error.err);
      });
  }

  return (
    <>
      <h4>Insert a row of {tableName}.</h4>
      <Form onSubmit={createRow}>
        {schema.length !== 0 &&
          schema.map((scheme: { [key: string]: any }, index) => {
            return (
              <Form.Row key={index}>
                <Form.Group as={Col} controlId={scheme.column_name}>
                  <Col md={1} lg={1} sm={2}>
                    <Form.Label>{scheme.column_name}</Form.Label>
                  </Col>
                  <Col md={4} lg={4} sm={3}>
                    <Form.Control
                      type="text"
                      name={scheme.column_name}
                      placeholder={scheme.data_type}
                    />
                  </Col>
                </Form.Group>
              </Form.Row>
            );
          })}
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
}
