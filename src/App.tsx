import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ExpenseTracking from './components/Expenses';
import CategoryAndIncome from './components/CategoryAndIncome';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpenseTracking />} />
        <Route path="/category-income" element={<CategoryAndIncome />} />
      </Routes>
    </Router>
  );
};

export default App; 