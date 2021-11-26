import React from 'react';
import { Pip, Tutela, AlternativeWelcome } from './pages';
import { Spinner } from '../../components';
import { useAppContext } from '../../../core/app/App.context';
import './Dashboard.view.css'


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
    } */}
      {renderPage()}
    </>
  ); 
};


export default Dashboard;
