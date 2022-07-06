import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const NavigationBar = ({css, text, logo, logoCss}) => {

    return (  
      
      <Navbar bg="dark" expand="lg" className={`${css} navbar-dark` }>
        <Container>
          <Navbar.Brand
            className={`${text}`}
            href="/">
            <img
              src={logo}
              className={logoCss}
            />{' '}
            Perfect Saturday
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className={`${text}`} href="/">Home</Nav.Link>
              <Nav.Link className={`${text}`} href="#">About</Nav.Link>              
              <Nav.Link className={`${text}`} href="#">Recap</Nav.Link>            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  
}
  
export default NavigationBar

/*

            <img className={`${logoCss}`} src={require(`../assets/${logo}`)} />

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
*/