import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router";

export default function TableLoader(props: { [key: string]: any }) {
  let { tableName }: { [key: string]: any } = useParams();
  const [schema, setSchema] = useState([]);
  const [whereClause, setWhereClause] = useState([]);
  const [sortOrder, setSortOrder] = useState([]);

  const opMap: { [key: string]: string } = {
    _eq: "equals",
    _gte: "greater than or equals",
    _gt: "greater than",
    _lte: "lesser than or equals",
    _lt: "lesser than",
    _neq: "not equals",
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/query`, {
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
          where: whereClause,
          sortBy: sortOrder,
        },
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setSchema(response.output);
      })
      .catch((error) => console.log(error));
  }, [tableName, whereClause, sortOrder]);

  function readTable(event: any) {
    let formData: any, formDataObj: any, sortData: any;
    if (event) {
      event.preventDefault();
      formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      if (data.value) {
        formDataObj = [
          {
            [data["columnSelect"]]: { [data["opSelect"]]: data.value },
          },
        ];
        setWhereClause(formDataObj);
      } else {
        setWhereClause([]);
      }

      if (data.sortSelect) {
        sortData = [
          { direction: data["sortSelect"], name: data["sortColumnSelect"] },
        ];
        setSortOrder(sortData);
      } else {
        setSortOrder([]);
      }
    }
  }
  /*
    return a table with the response that was received from server.
  */
  return (
    <>
      <h4>Viewing rows of {tableName}.</h4>
      <Form onSubmit={readTable}>
        <Col lg="6" md="5">
          <span>Filter</span>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Row>
              <Col lg="2">
                <Form.Label>Column name</Form.Label>
                <Form.Control as="select" name="columnSelect">
                  {schema.length !== 0 &&
                    Object.keys(schema[0]).map((scheme, index) => {
                      return (
                        <option key={index} value={scheme}>
                          {scheme}
                        </option>
                      );
                    })}
                </Form.Control>
              </Col>
              <Col lg="2">
                <Form.Label>Operation</Form.Label>
                <Form.Control as="select" name="opSelect">
                  {schema.length !== 0 &&
                    Object.keys(opMap).map((scheme, index) => {
                      return (
                        <option key={index} value={scheme}>
                          {[opMap[scheme]]}
                        </option>
                      );
                    })}
                </Form.Control>
              </Col>
              <Col lg="2">
                <Form.Label>Value</Form.Label>
                <Form.Control type="text" name="value"></Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Col>
        <Col lg="6" md="5">
          <span>Sort</span>
          <Form.Group controlId="exampleForm.SelectSort">
            <Row>
              <Col lg="2">
                <Form.Label>Column name</Form.Label>
                <Form.Control as="select" name="sortColumnSelect">
                  {schema.length !== 0 &&
                    Object.keys(schema[0]).map((scheme, index) => {
                      return (
                        <option key={index} value={scheme}>
                          {scheme}
                        </option>
                      );
                    })}
                </Form.Control>
              </Col>
              <Col lg="2">
                <Form.Label>Direction</Form.Label>
                <Form.Control as="select" name="sortSelect">
                  <option value="">--select sort order--</option>
                  <option value="asc">asc</option>
                  <option value="desc">desc</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Col>
        <Button variant="primary" type="submit">
          Run query
        </Button>
      </Form>
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
