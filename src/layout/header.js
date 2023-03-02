import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    return (
      
        <Navbar bg="light" expand="lg">
            <Navbar.Brand >Vehicle</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavItem>
                        <Link className="nav-link text-dark" to="/">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link text-dark" to="/pages/Model">Model</Link>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>

</Navbar>
    );
  }