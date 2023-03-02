import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Observer } from "mobx-react";
import modelStore from "../stores/modelStore";
import axios from "axios";

const Model = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [abrv, setAbrv] = useState("");
  const [vehicleMakeEntityId, setVehicleMakeEntityId] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAbrv, setEditAbrv] = useState("");
  const [editVehicleMakeEntityId, setEditVehicleMakeEntityId] = useState("");

  const [ascendingOrder, setAscendingOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    modelStore.getData();
  }, []);

  const handleDelete = (id) => {
    modelStore.deleteData(id);
  };

  const handleOrder = () => {
    modelStore.orderBy(!ascendingOrder);
    setAscendingOrder(!ascendingOrder);
  };

  const handleSave = () => {
    modelStore.saveData(abrv, name, vehicleMakeEntityId);
    clear();
  };

  const handleSearch = () => {
    modelStore.getModelList(searchTerm);
    clear();
  };

  const handlePaged = (currentPage, pageSize) => {
    console.log(currentPage);
    if (currentPage > 0) {
      setCurrentPage(currentPage);
      modelStore.getPaged(currentPage, pageSize);
    }
  };

  const handleGetAll = () => {
    modelStore.getData();
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`http://localhost:5161/api/VehicleModel/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAbrv(result.data.abrv);
        setEditVehicleMakeEntityId(result.data.vehicleMakeEntityId)
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const url = `http://localhost:5161/api/VehicleModel/${editId}`;
    const dataModel = {
      name: editName,
      abrv: editAbrv,
      vehicleMakeEntityId: editVehicleMakeEntityId,
    };
    axios
      .put(url, dataModel)
      .then((result) => {
        modelStore.getData();
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
    setEditVehicleMakeEntityId("");
    setVehicleMakeEntityId("");
    
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
                <th colSpan={6}>Vehicle Model</th>
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
                <th>MakeId</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {modelStore.dataModel && modelStore.dataModel.length > 0 ? (
                modelStore.dataModel.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.abrv}</td>
                      <td>{item.vehicleMakeEntityId}</td>
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
                  <td colSpan={6}>Loading...</td>
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
              <Modal.Title>Update Model</Modal.Title>
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
                <Col>
                  <input
                    type={"number"}
                    className="form-control"
                    placeholder="Enter MakeId"
                    value={editVehicleMakeEntityId}
                    onChange={(e) => setEditVehicleMakeEntityId(e.target.value)}
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
                <input
                  type={"number"}
                  className="form-control"
                  placeholder="Enter MakeId"
                  value={vehicleMakeEntityId}
                  onChange={(e) => setVehicleMakeEntityId(e.target.value)}
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

export default Model;
