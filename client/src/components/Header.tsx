import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFetchUserQuery } from '../store';

export default function Header() {
  const { data, error, isLoading } = useFetchUserQuery();
  
  function renderContent() {    
    if (isLoading) {
      return 'Still deciding';
    } else if (error) {
      return <div>Error logging in.</div>
    } else {
      if (!data) {
        return <Nav.Link href="/auth/google">Login With Google</Nav.Link>;
      } else {
        return <Nav.Link href="/api/logout">Logout</Nav.Link>;
      }
    }
  }

  return(
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Macros Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {renderContent()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}