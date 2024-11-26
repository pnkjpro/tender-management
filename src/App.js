import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Button from '@mui/material/Button';
import AdminPanel from './pages/AdminPanel';
import UserView from './pages/UserView';

function App() {
  const [isAdmin, setIsAdmin] = useState(true); //Toggle between admin and user views
  return (
    <div className="App">
      <Navbar title="Tender Management System" />
      <Button
        variant="contained"
        onClick={() => setIsAdmin(!isAdmin)}
        sx={{ mt: 2, margin: '0 auto', display: 'block' }}
      >
        Switch to {isAdmin ? 'User' : 'Admin'} View
      </Button>
      {isAdmin ? <AdminPanel /> : <UserView />}
    </div>
  );
}

export default App;