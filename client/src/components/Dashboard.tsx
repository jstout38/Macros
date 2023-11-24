import FoodPanel from './FoodPanel';
import Journal from './Journal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MacroTotals from './MacroTotals';
import { useState } from 'react';

export default function Dashboard() {
  
  const [ showModal, setShowModal ] = useState(false);

  const handleClose = () => setShowModal(false);
  const clickHandler = () => setShowModal(true);

  return (
    <Row className="dashboard position-relative g-0">
       
       <Col xs={0} sm={4} xl={2} className="foodPanel g-0">
        <FoodPanel />
      </Col>

      <Col className= "macroColumn" xs={2}>
        <MacroTotals />
      </Col>

      <Col className="journal" xs={12} sm={8}>
        <Journal />
      </Col>
      <Button onClick={clickHandler} className="mobileYourFoods">
        <h4 className="mobileButtonText">
          Update Your Foods
        </h4>
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Your Foods</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FoodPanel />
        </Modal.Body>        
      </Modal>
    </Row>

    );
}