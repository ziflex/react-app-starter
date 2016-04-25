import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default () => {
    return (
        <Navbar>
            <Navbar.Header>
                  <Navbar.Brand>
                      <a href="#">
                        React App Starter
                      </a>
                  </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} href="#">Link</NavItem>
                  <NavItem eventKey={2} href="#">Link</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
