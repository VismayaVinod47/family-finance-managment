import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const navigate = useNavigate();

  const familyMembers = [
    { id: 1, name: 'Dad', imageUrl: 'https://ui-avatars.com/api/?name=Dad&background=2563eb&color=fff' },
    { id: 2, name: 'Mom', imageUrl: 'https://ui-avatars.com/api/?name=Mom&background=2563eb&color=fff' },
    { id: 3, name: 'Son', imageUrl: 'https://ui-avatars.com/api/?name=Son&background=2563eb&color=fff' },
    { id: 4, name: 'Daughter', imageUrl: 'https://ui-avatars.com/api/?name=Daughter&background=2563eb&color=fff' }
  ];

  // Sample data for the income pie chart
  const incomeData = {
    labels: ['Food & Groceries', 'Transportation', 'Utilities', 'Entertainment', 'Shopping'],
    datasets: [
      {
        data: [12500, 8000, 6000, 4500, 7000],
        backgroundColor: [
          '#f87171',
          '#60a5fa',
          '#4ade80',
          '#fbbf24',
          '#c084fc'
        ],
        borderColor: [
          '#ef4444',
          '#3b82f6',
          '#22c55e',
          '#f59e0b',
          '#a855f7'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Sample data for the yearly expenses line chart
  const expensesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [8500, 9200, 7800, 8900, 9500, 8700, 9800, 8300, 9100, 8600, 9300, 9700],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Expenses by Category',
        font: {
          size: 16,
        },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Yearly Expenses Trend',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number | string) {
            return '₹' + Number(value).toLocaleString();
          }
        },
      },
    },
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Family Finance</h2>
        </div>
        <div className="nav-links">
          <button className="nav-item active" onClick={() => handleNavigation('/dashboard')}>
            <span className="icon">📊</span>
            <span>Dashboard</span>
          </button>
          <button className="nav-item" onClick={() => handleNavigation('/expenses')}>
            <span className="icon">💰</span>
            <span>Expense Tracking</span>
          </button>
          <button className="nav-item">
            <span className="icon">📁</span>
            <span>Category and income Management</span>
          </button>
          
          <button className="nav-item">
            <span className="icon">👤</span>
            <span>Profile</span>
          </button>
        </div>
        <button className="sign-out">
          <span className="icon">⬅️</span>
          <span>Sign Out</span>
        </button>
      </div>
      <div className="main-content">
        <div className="top-bar">
          <h1>Dashboard Overview</h1>
          <div className="top-bar-right">
            <div className="family-members">
              {familyMembers.map((member) => (
                <div key={member.id} className="member-avatar" title={member.name}>
                  <img src={member.imageUrl} alt={member.name} />
                  <span className="status-dot active"></span>
                </div>
              ))}
            </div>
            <div className="notification-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-dot"></span>
            </div>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="finance-cards">
            <div className="finance-card balance">
              <div className="card-content">
                <h3>Current Balance</h3>
                <p className="amount">₹12,750</p>
              </div>
            </div>
            <div className="finance-card expenses">
              <div className="card-content">
                <h3>Daily Expenses</h3>
                <p className="amount">₹245</p>
              </div>
            </div>
          </div>
          <div className="charts-container">
            <div className="chart-card">
              <Pie data={incomeData} options={pieChartOptions} />
            </div>
            <div className="chart-card">
              <Line data={expensesData} options={lineChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
