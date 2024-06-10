import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
