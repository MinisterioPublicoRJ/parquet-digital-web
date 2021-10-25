import React, { useState, useEffect } from 'react';

import { useAppContext } from '../../../core/app/App.context';

const Dashboard = () => {
  const { user, logout } = useAppContext();

  return (
    <div style={{margin: '10%'}}>
      <div> Olá {user?.nome}</div>
      <button onClick={logout}> Logout </button>
    </div>
  ); 
};

export default Dashboard;
