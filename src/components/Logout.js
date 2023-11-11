import React from 'react';
import { logout } from '../firebase/firebaseAuth';

const Logout = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
