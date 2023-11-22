import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useFetchUserQuery } from '../store';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTargets } from '../store/slices/userSlice';
import Modal from 'react-bootstrap/Modal';
import Update from './Update';

export default function Header() {
  const { data, error, isLoading } = useFetchUserQuery();
    
  const [ show, setShow ] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setTargets({
        "calories": data.calories,
        "protein": data.protein,
        "carbs": data.carbs,
        "fat": data.fat,
        "fiber": data.fiber,
      }));
    }
  }, [data]);
  

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
          </Nav>
        )
      } else {
        
        return (
        <Nav className="flex-row">
          <Nav.Link onClick={handleShow}>My Account </Nav.Link>
          <Nav.Link href="/api/logout">Logout</Nav.Link>
        </Nav>
        )
      }
    }
  }

  return(
      <Row className="header">
      <Navbar expand="lg" className="header bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Macros Tracker</Navbar.Brand>
          <Navbar.Text id="basic-navbar-nav">
              {renderContent()}
          </Navbar.Text>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Account!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Update />
        </Modal.Body>        
      </Modal>
      </Row>
  );
}