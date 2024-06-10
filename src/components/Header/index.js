import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';

const Header = () => {
  const [activeTab, setActiveTab] = useState();
  const location = useLocation();

  // Get the last part of the URL path
  const path = location.pathname.split('/').filter(Boolean).pop();
  useEffect(()=>{
    path !== 'statusPage' ? setActiveTab('Dashboard') : setActiveTab('Events')
  },[])

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => handleTabClick('Dashboard')}>
          <Link to="/" className="nav-link">Dashboard</Link>
        </li>
        <li className={`nav-item ${activeTab === 'Events' ? 'active' : ''}`} onClick={() => handleTabClick('Events')}>
          <Link to="/statusPage" className="nav-link">Event</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
