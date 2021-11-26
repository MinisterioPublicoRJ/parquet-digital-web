import React, { useState } from 'react';
import { Pip, Tutela, AlternativeWelcome } from './pages';
import { Spinner, Modal } from '../../components';
import { useAppContext } from '../../../core/app/App.context';
import './Dashboard.view.css'
import { Introduction } from './sections';


const Dashboard = () => {
  const { user, currentOffice } = useAppContext(); 
  const { firstLogin } = useAppContext().user;
  const type = currentOffice ? currentOffice.tipo : undefined;
  const [modalType, setModalType] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(firstLogin);


  if (!user) {
    return <Spinner size="large" />;
  }

  function renderPage() {
    switch (type) {
      case 1:
        return (
          <Tutela />
        );
      case 2:
        return (
          <Pip />
        );
      default:
        return <AlternativeWelcome />;
    }
  }

  
  return (
    <>
    {!firstLogin &&
      <Introduction isOpen={isIntroOpen} onToggle={() => setIsIntroOpen((oldState) => !oldState)} type={type} />
    }
    {renderPage()}
    </>
  ); 
};


export default Dashboard;
