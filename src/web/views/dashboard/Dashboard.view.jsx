import React, { useState, useEffect } from 'react';

import { useAppContext } from '../../../core/app/App.context';
import './Dashboard.css'

import {
  Alerts,
  ProcessingTime,
} from '../sections';


const Dashboard = () => {
  const { user, logout } = useAppContext();

  return (
    <div className="base-grid tutela-grid">
      <ProcessingTime/>
      <Alerts/>
      <div> Olá {user?.nome}</div>
      <button onClick={logout}> Logout </button>
    </div>
  ); 
};

export default Dashboard;
