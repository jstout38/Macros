import FoodPanel from './FoodPanel';
import Journal from './Journal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MacroTotals from './MacroTotals';
import { useState } from 'react';

//Main Dashboard component - houses the main app that only shows up if logged in on the App componenet
export default function Dashboard() {
  
  //Create state for whether food panel model is open - only visible at mobile sizes to save space
  const [ showModal, setShowModal ] = useState(false);

  //Event handlers for food panel modal
  const handleClose = () => setShowModal(false);
  const clickHandler = () => setShowModal(true);

   //State for showing macro total modal in mobile resolutions
   const [ macroShow, setMacroShow] = useState(false);

   const handleMacroClose = () => setMacroShow(false);
   const handleMacroShow = () => setMacroShow(true);

  //Three columns - at larger sizes the macro column displays macro totals and foodpanel shows user's foods
  //At mobile resolutions only the journal column is visible and the other columns are visible via modal
  return (
    <Row className="dashboard position-relative g-0">       
      <Col xs={0} sm={4} xl={2} className="foodPanel g-0">
        <FoodPanel />
      </Col>
      <Col className= "macroColumn" xs={2}>
        <MacroTotals modalClose={handleMacroClose} show={macroShow} />
      </Col>
      <Col className="journal" xs={12} sm={8}>
        <Journal showMacroModal={handleMacroShow} />
      </Col>
      <Button onClick={clickHandler} className="justify-content-center mobileYourFoods">
        <h4 className="mobileButtonText">
          Update Your Foods
        </h4>
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
            <Modal.Title>Your Foods</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FoodPanel />
        </Modal.Body>        
      </Modal>
    </Row>

    );
}