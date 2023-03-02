import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Observer } from "mobx-react";
import makeStore from "../stores/makeStore";
import axios from "axios";

const Make = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [abrv, setAbrv] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAbrv, setEditAbrv] = useState("");

  const [ascendingOrder, setAscendingOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    makeStore.getData();
  }, []);

  const handleDelete = (id) => {
    makeStore.deleteData(id);
  };

  const handleOrder = () => {
    makeStore.orderBy(!ascendingOrder);
    setAscendingOrder(!ascendingOrder);
  };

  const handleSave = () => {
    makeStore.saveData(abrv, name, clear);
    clear();
  };

  const handleSearch = () => {
    makeStore.getMakeList(searchTerm);
    clear();
  };

  const handlePaged = (currentPage, pageSize) => {
    console.log(currentPage);
    if (currentPage > 0) {
      setCurrentPage(currentPage);
      makeStore.getPaged(currentPage, pageSize);
    }
  };

  const handleGetAll = () => {
    makeStore.getData();
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`http://localhost:5161/api/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAbrv(result.data.abrv);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const url = `http://localhost:5161/api/${editId}`;
    const data = {
      name: editName,
      abrv: editAbrv,
    };
    axios
      .put(url, data)
      .then((result) => {
        makeStore.getData();
        clear();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const clear = () => {
    setAbrv("");
    setName("");
    setEditAbrv("");
    setEditName("");
    setEditId("");
    setSearchTerm("");
  };

  return (
    <Observer>
      {() => (
        <Fragment>
          <Container>
            <Row>
              <Col>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Search by Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                ></input>
              </Col>
              <Col>
                <button className="btn btn-primary" onClick={handleSearch}>
                  Search
                </button>
              </Col>
            </Row>
          </Container>
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan={5}>Vehicle Make</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOrder()}
                  >
                    Name
                  </button>
                </th>
                <th>Abrv</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {makeStore.data && makeStore.data.length > 0 ? (
                makeStore.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.abrv}</td>
                      <td colSpan={2}>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>{" "}
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>Loading...</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <button
                    className="btn btn-light"
                    onClick={() => handlePaged(1, pageSize)}
                  >
                    First Page
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-light"
                    onClick={() => handlePaged(currentPage - 1, pageSize)}
                  >
                    Previous Page
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-light"
                    onClick={() => handlePaged(currentPage + 1, pageSize)}
                  >
                    Next Page
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-light"
                    onClick={() => handleGetAll()}
                  >
                    Get All
                  </button>
                </td>
                <td>Pages of 5 Vehicles</td>
              </tr>
            </tfoot>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Make</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  ></input>
                </Col>
                <Col>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter Abrv"
                    value={editAbrv}
                    onChange={(e) => setEditAbrv(e.target.value)}
                  ></input>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <br></br>
          <Container>
            <Row>
              <Col>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </Col>
              <Col>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter Abrv"
                  value={abrv}
                  onChange={(e) => setAbrv(e.target.value)}
                ></input>
              </Col>
              <Col>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSave()}
                >
                  Submit
                </button>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
          </Container>
        </Fragment>
      )}
    </Observer>
  );
};

export default Make;
