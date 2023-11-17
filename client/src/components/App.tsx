import React from 'react';
import Update from './Update';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Search from './Search';
import AddFood from './AddFood';

import Header from './Header';
import Dashboard from './Dashboard';



const App: React.FC = () => {    

    return (
      <div className="container">
          <div>
            <Header />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/update" element={<Update />} />
              </Routes>
            </BrowserRouter>
          </div>
      </div>
    );
};

export default App;