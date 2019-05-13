import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './HomePage.js';
import StockInfoPage from './StockInfoPage.js';
import Testing from './Testing.js';
import KPIPage from './KPIpage.js';

function GlobalRouter() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/:symbol" component={StockInfoPage} />
      <Route exact path="/:symbol/:kpi" component={KPIPage} />
      <Route exact path="/testing/1" component={Testing} />
    </Router>
  )
}

export default GlobalRouter
