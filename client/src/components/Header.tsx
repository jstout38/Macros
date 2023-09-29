import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
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
        return(
          <Nav className="flex-row">
            <Button className="mx-1 text-light" variant="success" href="/auth/google">Login With Google</Button>
            <Button className="mx-1 text-light" variant="danger" href="/register">Register with Google</Button>
          </Nav>
        )
      } else {
        return <Nav.Link href="/api/logout">Logout</Nav.Link>;
      }
    }
  }

  return(
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Macros Tracker</Navbar.Brand>
          <Navbar.Text id="basic-navbar-nav">
              {renderContent()}
          </Navbar.Text>
        </Container>
      </Navbar>
    );
}