import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './CategoryAndIncome.css';

interface ExpenseCategory {
  id: number;
  category: string;
  budget: number;
  spent: number;
  balance: number;
}

const CategoryAndIncome: React.FC = () => {
  const navigate = useNavigate();
  const [totalIncome, setTotalIncome] = useState<number>(100000); // Initial income
  const [isEditingIncome, setIsEditingIncome] = useState<boolean>(false);
  const [editedIncome, setEditedIncome] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [newBudget, setNewBudget] = useState<string>("");
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);

  const [expenses, setExpenses] = useState<ExpenseCategory[]>([
    {
      id: 1,
      category: "Food & Groceries",
      budget: 15000,
      spent: 12500,
      balance: 2500
    },
    {
      id: 2,
      category: "Transportation",
      budget: 10000,
      spent: 8000,
      balance: 2000
    },
    {
      id: 3,
      category: "Utilities",
      budget: 8000,
      spent: 6000,
      balance: 2000
    },
    {
      id: 4,
      category: "Entertainment",
      budget: 5000,
      spent: 4500,
      balance: 500
    },
    {
      id: 5,
      category: "Shopping",
      budget: 12000,
      spent: 7000,
      balance: 5000
    }
  ]);

  const familyMembers = [
    { id: 1, name: 'Dad', imageUrl: 'https://ui-avatars.com/api/?name=Dad&background=2563eb&color=fff' },
    { id: 2, name: 'Mom', imageUrl: 'https://ui-avatars.com/api/?name=Mom&background=2563eb&color=fff' },
    { id: 3, name: 'Son', imageUrl: 'https://ui-avatars.com/api/?name=Son&background=2563eb&color=fff' },
    { id: 4, name: 'Daughter', imageUrl: 'https://ui-avatars.com/api/?name=Daughter&background=2563eb&color=fff' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleIncomeEdit = () => {
    setIsEditingIncome(true);
    setEditedIncome(totalIncome.toString());
  };

  const handleIncomeSave = () => {
    const newIncome = parseFloat(editedIncome);
    if (!isNaN(newIncome) && newIncome > 0) {
      setTotalIncome(newIncome);
    }
    setIsEditingIncome(false);
    setEditedIncome("");
  };

  const handleAddCategory = () => {
    if (newCategory && newBudget) {
      const budget = parseFloat(newBudget);
      if (!isNaN(budget) && budget > 0) {
        const totalBudget = expenses.reduce((sum, exp) => sum + exp.budget, 0) + budget;
        if (totalBudget <= totalIncome) {
          const newId = Math.max(...expenses.map(exp => exp.id)) + 1;
          setExpenses([...expenses, {
            id: newId,
            category: newCategory,
            budget: budget,
            spent: 0,
            balance: budget
          }]);
          setNewCategory("");
          setNewBudget("");
          setIsAddingCategory(false);
        } else {
          alert("Total budget cannot exceed total income!");
        }
      }
    }
  };

  const calculateRemainingBudget = () => {
    const totalBudget = expenses.reduce((sum, exp) => sum + exp.budget, 0);
    return totalIncome - totalBudget;
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Family Finance</h2>
        </div>
        <div className="nav-links">
          <button className="nav-item" onClick={() => handleNavigation('/dashboard')}>
            <span className="icon">📊</span>
            <span>Dashboard</span>
          </button>
          <button className="nav-item" onClick={() => handleNavigation('/expenses')}>
            <span className="icon">💰</span>
            <span>Expense Tracking</span>
          </button>
          <button className="nav-item active">
            <span className="icon">📁</span>
            <span>Category and Income Management</span>
          </button>
          <button className="nav-item">
            <span className="icon">👤</span>
            <span>Profile</span>
          </button>
        </div>
        <button className="sign-out" onClick={() => handleNavigation('/')}>
          <span className="icon">⬅️</span>
          <span>Sign Out</span>
        </button>
      </div>
      <div className="main-content">
        <div className="top-bar">
          <h1>Category and Income Management</h1>
        </div>
        <div className="management-container">
          <div className="income-section">
            <div className="income-header">
              <h2>Monthly Income</h2>
              {!isEditingIncome ? (
                <div className="income-display">
                  <span className="income-amount">₹{totalIncome.toLocaleString()}</span>
                  <button onClick={handleIncomeEdit} className="edit-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="income-edit">
                  <input
                    type="number"
                    value={editedIncome}
                    onChange={(e) => setEditedIncome(e.target.value)}
                    className="edit-input"
                    autoFocus
                  />
                  <button onClick={handleIncomeSave} className="save-btn">Save</button>
                  <button onClick={() => setIsEditingIncome(false)} className="cancel-btn">Cancel</button>
                </div>
              )}
            </div>
            <div className="income-summary">
              <div className="summary-item">
                <span className="label">Allocated Budget</span>
                <span className="amount">₹{expenses.reduce((sum, exp) => sum + exp.budget, 0).toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span className="label">Remaining Budget</span>
                <span className="amount">₹{calculateRemainingBudget().toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="category-management">
            <div className="category-header">
              <h2>Category Management</h2>
              {!isAddingCategory ? (
                <button onClick={() => setIsAddingCategory(true)} className="add-category-btn">
                  Add New Category
                </button>
              ) : (
                <div className="add-category-form">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="category-input"
                  />
                  <input
                    type="number"
                    placeholder="Budget Amount"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="budget-input"
                  />
                  <button onClick={handleAddCategory} className="save-btn">Add</button>
                  <button onClick={() => setIsAddingCategory(false)} className="cancel-btn">Cancel</button>
                </div>
              )}
            </div>
            <div className="categories-list">
              {expenses.map(category => (
                <div key={category.id} className="category-card">
                  <div className="category-info">
                    <h3>{category.category}</h3>
                    <div className="budget-info">
                      <span className="label">Budget:</span>
                      <span className="value">₹{category.budget.toLocaleString()}</span>
                    </div>
                    <div className="percentage-info">
                      <span className="label">% of Income:</span>
                      <span className="value">{((category.budget / totalIncome) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="category-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${(category.budget / totalIncome) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAndIncome; 