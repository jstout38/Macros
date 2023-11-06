import React from 'react';
import Update from './Update';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Search from './Search';
import AddFood from './AddFood';

import Header from './Header';

const Landing: React.FC = () => <Link to={"/search"}><h2>Search for Foods!</h2></Link>


const App: React.FC = () => {    

    return (
      <div className="container">
          <div>
            <Header />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/update" element={<Update />} />
                <Route path="/search" element={<Search />} />
                <Route path="/addFood" element={<AddFood />} />
              </Routes>
            </BrowserRouter>
          </div>
      </div>
    );
};

export default App;