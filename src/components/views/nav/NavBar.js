import React from 'react';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Login from './Login'
import { AuthContext } from '../../../contexts/auth'

import styled from 'styled-components'

const NavBar = ({ onSelect, active, play, edit, disabled }) => {
  return (
    <AuthContext.Consumer>
      { userData =>
        <CustomNavBar sticky="top">
          <Navbar.Brand>Botonera</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav activeKey={active} variant="pills" className="mr-auto" onSelect={onSelect}>
            <Nav.Item variant="dark">
              <Nav.Link eventKey={play} disabled={disabled} className="nav-link-botonera">Play</Nav.Link>
            </Nav.Item>
            <Nav.Item variant="dark">
              <Nav.Link eventKey={edit} disabled={disabled} className="nav-link-botonera">Edit</Nav.Link>
            </Nav.Item>
          </Nav>

          <Login />
        </CustomNavBar>
      }
    </AuthContext.Consumer>
  )
};

const CustomNavBar = styled(Navbar)`
  background: #fff;
  border-radius: 0;
  border-bottom: 1px solid #bfbfbf;
  color: #8f8f8f;
  font-weight: 200;
  min-height: 60px;
  max-height: 60px;
`

export default NavBar;
