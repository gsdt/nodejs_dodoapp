import React, { Component } from 'react'
import {Nav, Navbar} from 'react-bootstrap'
export default class Header extends Component {
    render() {
        return (
        <Navbar bg="dark" variant="dark" style={{marginBottom: "10px"}}>
            <Navbar.Brand href="/">Todo App</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                Wellcome <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>

        )
    }
}
