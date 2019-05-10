import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './HomePage.js';
import StockInfoPage from './StockInfoPage.js';

function GlobalRouter() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route path="/:symbol" component={StockInfoPage} />
    </Router>
  )
}

export default GlobalRouter
