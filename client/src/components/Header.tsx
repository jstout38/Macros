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

//Header component for logging in
//This compoenent also sets state slices for macrotargets from the fields from the user's record so that they
//can be retrieved later for macro totals
export default function Header() {
  //Fetch user data
  const { data, error, isLoading } = useFetchUserQuery();
    
  //Create state for whether My Account modal is showing
  const [ show, setShow ] = useState(false);

  //Handlers for opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Create dispatch modal for setting RTK slice for macro targets
  const dispatch = useDispatch();

  //On retrieving user set RTK state for macro targets
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
  

  //If user is not logged in give them the option to do so, overwise show the My Account and Logout buttons
  function renderContent() {    
    if (isLoading) {
      return 'Still deciding';
    } else if (error) {
      return <div>Error logging in.</div>
    } else {
      if (!data) {
        return(
          <Nav className="me-auto">
            <Button className="mx-1 text-light" variant="success" href="/auth/google">Login With Google</Button>
          </Nav>
        )
      } else {        
        return (
        <Nav className="me-auto">
          <Nav.Link onClick={handleShow}>My Account </Nav.Link>
          <Nav.Link href="/api/logout">Logout</Nav.Link>
        </Nav>
        )
      }
    }
  }

  return(
      <Row className="header">
        <Navbar expand="lg">        
          <Container fluid>
            <Navbar.Brand href="/">Macros Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Navbar.Text id="basic-navbar-nav">
                {renderContent()}
              </Navbar.Text>
            </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Update Your Account!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Update closeModal={handleClose}/>
        </Modal.Body>        
      </Modal>
      </Row>
  );
}