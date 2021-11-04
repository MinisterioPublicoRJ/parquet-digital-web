import React, { useState, useEffect } from 'react';
import { Pip, Tutela } from './pages';

import { useAppContext } from '../../../core/app/App.context';
import './Dashboard.css'

const Dashboard = () => {
  const { user, logout, currentOffice } = useAppContext(); 
  const { firstLogin } = useAppContext().user;
  const type = currentOffice ? currentOffice.tipo : undefined;

  console.log(firstLogin);
  console.log(user, currentOffice);

  function renderPage() {
    switch (type) {
      case 1:
        return (
          <Tutela/>
        );
      case 2:
        return (
          <Pip/>
        );
      default:
        return <Tutela />;
    }
  }

  return (
    <>
      {renderPage()}
    </>
  ); 
};

export default Dashboard;
