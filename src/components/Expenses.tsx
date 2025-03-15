import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './Expenses.css';

interface ExpenseCategory {
  id: number;
  category: string;
  budget: number;
  spent: number;
  balance: number;
}

const Expenses: React.FC = () => {
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

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedAmount, setEditedAmount] = useState<string>("");

  const familyMembers = [
    { id: 1, name: 'Dad', imageUrl: 'https://ui-avatars.com/api/?name=Dad&background=2563eb&color=fff' },
    { id: 2, name: 'Mom', imageUrl: 'https://ui-avatars.com/api/?name=Mom&background=2563eb&color=fff' },
    { id: 3, name: 'Son', imageUrl: 'https://ui-avatars.com/api/?name=Son&background=2563eb&color=fff' },
    { id: 4, name: 'Daughter', imageUrl: 'https://ui-avatars.com/api/?name=Daughter&background=2563eb&color=fff' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
      setEditedAmount(expense.spent.toString());
    }
  };

  const handleSave = (id: number) => {
    const newAmount = parseFloat(editedAmount);
    if (!isNaN(newAmount)) {
      setExpenses(expenses.map(expense => {
        if (expense.id === id) {
          const balance = expense.budget - newAmount;
          return {
            ...expense,
            spent: newAmount,
            balance: balance
          };
        }
        return expense;
      }));
    }
    setEditingId(null);
    setEditedAmount("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedAmount("");
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
      }
    }
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
          <button className="nav-item active" onClick={() => handleNavigation('/expenses')}>
            <span className="icon">💰</span>
            <span>Expense Tracking</span>
          </button>
          <button className="nav-item" onClick={() => handleNavigation('/category-income')}>
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
          <h1>Expense Tracking</h1>
        </div>
        <div className="expenses-container">
          <div className="expenses-header">
            <h2>Expense Categories</h2>
            <div className="total-summary">
              <div className="summary-item">
                <span className="label">Total Budget</span>
                <span className="amount">₹{expenses.reduce((sum, exp) => sum + exp.budget, 0).toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span className="label">Total Spent</span>
                <span className="amount">₹{expenses.reduce((sum, exp) => sum + exp.spent, 0).toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span className="label">Total Balance</span>
                <span className="amount">₹{expenses.reduce((sum, exp) => sum + exp.balance, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="expense-cards">
            {expenses.map(expense => (
              <div key={expense.id} className="expense-card">
                <div className="expense-card-header">
                  <h3>{expense.category}</h3>
                  {editingId !== expense.id && (
                    <button onClick={() => handleEdit(expense.id)} className="edit-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="expense-card-content">
                  <div className="expense-info">
                    <div className="info-item">
                      <span className="label">Budget</span>
                      <span className="value">₹{expense.budget.toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Spent</span>
                      {editingId === expense.id ? (
                        <input
                          type="number"
                          value={editedAmount}
                          onChange={(e) => setEditedAmount(e.target.value)}
                          className="edit-input"
                          autoFocus
                        />
                      ) : (
                        <span className="value">₹{expense.spent.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="info-item">
                      <span className="label">Balance</span>
                      <span className="value balance">₹{expense.balance.toLocaleString()}</span>
                    </div>
                  </div>
                  {editingId === expense.id && (
                    <div className="action-buttons">
                      <button onClick={() => handleSave(expense.id)} className="save-btn">
                        Save
                      </button>
                      <button onClick={handleCancel} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                <div className="expense-progress">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${Math.min((expense.spent / expense.budget) * 100, 100)}%`,
                      backgroundColor: expense.spent > expense.budget ? '#ef4444' : '#22c55e'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses; 