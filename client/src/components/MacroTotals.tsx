import { useState, useEffect } from 'react';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function MacroTotals() {
  
  var dailyTotals = useSelector((state: RootState) => state.macros);

  var targets = useSelector((state: RootState) => state.targets);

  const chartStyle = {
    height: 50,
    width: 125,
  }

  const [ macroTotals, setMacroTotals ] = useState<macroList>({
    "calories" : 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0,
    "fiber": 0
  });

  type macroList = {
    [index: string]: number
  }

  useEffect(() => {
    var newTotals = {
        "calories": Math.round(dailyTotals["breakfast"].calories + dailyTotals["lunch"].calories + dailyTotals["dinner"].calories + dailyTotals["snacks"].calories),
        "protein": Math.round(dailyTotals["breakfast"].protein + dailyTotals["lunch"].protein + dailyTotals["dinner"].protein + dailyTotals["snacks"].protein),
        "carbs": Math.round(dailyTotals["breakfast"].carbs + dailyTotals["lunch"].carbs + dailyTotals["dinner"].carbs + dailyTotals["snacks"].carbs),
        "fat": Math.round(dailyTotals["breakfast"].fat + dailyTotals["lunch"].fat + dailyTotals["dinner"].fat + dailyTotals["snacks"].fat),
        "fiber": Math.round(dailyTotals["breakfast"].fiber + dailyTotals["lunch"].fiber + dailyTotals["dinner"].fiber + dailyTotals["snacks"].fiber),
    };
    setMacroTotals(newTotals);  
    
  }, [dailyTotals]);

  const macros = ['calories', 'protein', 'carbs', 'fat', 'fiber'];
  const colors = ['bg-danger', 'bg-success', 'bg-primary', 'bg-warning', 'bg-secondary'];
  const containers = [];
  for (var i = 0; i < macros.length; i++) {
    containers.push(
      <Row key={i} className = {colors[i] + " text-light align-content-center macroItem"}>       
        <Row className="justify-content-center align-content-center macroItem">
          <GaugeChart id={"gaugeChart-" + i}  className="gaugeChart" style={chartStyle}
            nrOfLevels={2} 
            percent={macroTotals[macros[i]] / targets[macros[i]]} 
            arcsLength={[.95,.05]}
          />
        </Row>
        <Row className="align-content-center macroItem">
            <h4 className="macro-item">Total {macros[i]}</h4>
            </Row>
            <Row className="align-content-center macroItem">
              <h4 className="macro-item">{macroTotals[macros[i]]}</h4>
            </Row>           
        </Row>
    );
  };

  return (
    <Col className= "d-flex flex-column justify-content flex-grow-1 fluid macroRow">
        {containers}
    </Col>
  )

}