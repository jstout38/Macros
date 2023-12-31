import { useState, useEffect } from 'react';
import type { RootState } from '../store';
import { useSelector } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { PatchQuestionFill } from 'react-bootstrap-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

//Component for displaying macro totals - uses Gaugechart component found on github - thanks to Martin36
//https://github.com/Martin36/react-gauge-chart
// MIT License

// Copyright (c) 2019 

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

type MacroTotalsProps = {
  show: boolean,
  modalClose: () => void,
}

export default function MacroTotals(props: MacroTotalsProps) {
  
  //Retrieve state from RTK for daily totals and targets
  var dailyTotals = useSelector((state: RootState) => state.macros);
  var targets = useSelector((state: RootState) => state.targets);

  //Styling for Guagechart component
  const chartStyle = {    
    width: '50%',
    'margin-bottom': 0
  }

  type macroList = {
    [index: string]: number
  }

  //Create state for displaying daily totals - state stores by meal so we need to do some math below
  const [ macroTotals, setMacroTotals ] = useState<macroList>({
    "calories" : 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0,
    "fiber": 0
  });

  const [ macroPercents, setMacroPercents ] = useState<macroList>({
    "calories" : 0,
    "protein" : 0,
    "carbs" : 0,
    "fat" : 0,
    "fiber" : 0
  }) 

  //When daily totals are fetched add up the meals for each macro
  useEffect(() => {
    var newTotals = {
        "calories": Math.round(
          dailyTotals["breakfast"].calories + 
          dailyTotals["lunch"].calories + 
          dailyTotals["dinner"].calories + 
          dailyTotals["snacks"].calories),
        "protein": Math.round(
          dailyTotals["breakfast"].protein + 
          dailyTotals["lunch"].protein + 
          dailyTotals["dinner"].protein + 
          dailyTotals["snacks"].protein),
        "carbs": Math.round(
          dailyTotals["breakfast"].carbs + 
          dailyTotals["lunch"].carbs + 
          dailyTotals["dinner"].carbs + 
          dailyTotals["snacks"].carbs),
        "fat": Math.round(
          dailyTotals["breakfast"].fat + 
          dailyTotals["lunch"].fat + 
          dailyTotals["dinner"].fat + 
          dailyTotals["snacks"].fat),
        "fiber": Math.round(
          dailyTotals["breakfast"].fiber + 
          dailyTotals["lunch"].fiber + 
          dailyTotals["dinner"].fiber + 
          dailyTotals["snacks"].fiber),
    };
    setMacroTotals(newTotals);  
  }, [dailyTotals]);

  useEffect(() => {
    setMacroPercents({
      'calories': targets['calories'] === 0 ? 0 : macroTotals['calories'] / targets['calories'],
      'protein': targets['protein'] === 0 ? 0 : macroTotals['protein'] / targets['protein'],
      'carbs': targets['carbs'] === 0 ? 0 : macroTotals['carbs'] / targets['carbs'],
      'fat': targets['fat'] === 0 ? 0 : macroTotals['fat'] / targets['fat'],
      'fiber': targets['fiber'] === 0 ? 0 : macroTotals['fiber'] / targets['fiber'],
    });
  }, [targets, macroTotals]);

  const macroTooltip = (
    <OverlayTrigger
      placement={"left"}
      overlay={
      <Tooltip>
        Make sure to input your daily targets for your macros under My Account to see your daily percentages!
      </Tooltip>
      }
    >
    <PatchQuestionFill size={24} className="m-0 macroHelp"/>
    </OverlayTrigger>
  )

  //Create the macro display element for each meal - could be broken out into a new component
  const macros = ['calories', 'protein', 'carbs', 'fat', 'fiber'];
  const colors = ['bg-danger', 'bg-success', 'bg-primary', 'custom-yellow', 'bg-secondary'];
  const containers = [];
  for (var i = 0; i < macros.length; i++) {
    containers.push(
      <Row key={i} className = {colors[i] + " text-light macroItem"}>               
        <Row className="justify-content-center macroItem">          
          <GaugeChart id={"gaugeChart-" + i}  className="gaugeChart" style={chartStyle}
            nrOfLevels={2} 
            percent={macroPercents[macros[i]]} 
            arcsLength={[.95,.05]}
          />
        </Row>
        <Row className="macroItem justify-content-center" xs={12}>            
          <h4 className="macro-item">Total {macros[i]}</h4>
        </Row>
        <Row className="macroItem">
          <Col xs="3"></Col>
          <Col xs="6">
            <h4 className="macro-item">{macroTotals[macros[i]]}</h4>
          </Col>
          <Col xs="3">
            {i === 0 ? macroTooltip : <div></div>}
          </Col>
        </Row>           
      </Row>
    );
  };

  return (
    <Col className= "flex-column justify-content-evenly macroCol">
        {containers}

      
      
      <Modal fullscreen show={props.show} onHide={props.modalClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Dailly Macro Totals</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            {containers}
          </Modal.Body>        
      </Modal>

    </Col>
  )

}