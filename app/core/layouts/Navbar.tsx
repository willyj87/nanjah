import Image from "next/image"
import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"

const NavbarLayout = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/logo_mariage_long.svg" width="100" height="30" alt="wedding logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Tables</Nav.Link>
            <Nav.Link href="/">Participants</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarLayout
