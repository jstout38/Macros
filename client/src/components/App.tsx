import React from 'react';
import Update from './Update';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './Search';

import Header from './Header';

const Dashboard: React.FC = () => <h2>Dashboard</h2>
const SurveyNew: React.FC = () => <h2>SurveyNew</h2>
const Landing: React.FC = () => <h2>Landing</h2>


const App: React.FC = () => {    

    return (
      <div className="container">
          <div>
            <Header />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/surveys" element={<Dashboard />} />
                <Route path="/surveys/new" element={<SurveyNew />} />
                <Route path="/update" element={<Update />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </BrowserRouter>
          </div>
      </div>
    );
};

export default App;