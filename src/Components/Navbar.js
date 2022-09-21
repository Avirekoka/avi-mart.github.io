import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import AppNavbar from 'react-bootstrap/Navbar';

function Header() {

  return (
    <AppNavbar bg="light" expand="lg" variant="light">
      <Container>
        <AppNavbar.Brand href="/">Home</AppNavbar.Brand>
        <Nav>
            <Nav.Link href="/cart">
              Checkout Cart
            </Nav.Link>
        </Nav>
      </Container>
    </AppNavbar>
  );
}

export default Header;