import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
         <div>
          <Route path="/" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/new" component={SurveyNew} />
         </div>
      </BrowserRouter>
    </div>
  );
};

export default App;