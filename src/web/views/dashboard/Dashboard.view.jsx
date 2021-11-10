import React, { useState, useEffect } from 'react';
import { Pip, Tutela, AlternativeWelcome } from './pages';
import { Spinner } from '../../components';
import { Glossary, Introduction, MapaTron } from './sections';
import OfficeSelector from './sections/Today/officeSelector';

import { useAppContext } from '../../../core/app/App.context';
import './Dashboard.css'

const Dashboard = () => {
  const { user, currentOffice } = useAppContext(); 
  const { firstLogin } = useAppContext().user;
  const type = currentOffice ? currentOffice.tipo : undefined;

  if (!user) {
    return <Spinner size="large" />;
  }
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
        return <AlternativeWelcome />;
    }
  }

  return (
    <>
    {/*{firstLogin <Introduction
        type={type}
      />
    : null
    } 
    {/*<Introduction
        type={type}
      />
      <OfficeSelector
    />*/}
      {renderPage()}
    </>
  ); 
};

export default Dashboard;
