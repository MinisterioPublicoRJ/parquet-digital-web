import React, { useEffect, useState } from 'react';
import { Pip, Tutela, AlternativeWelcome } from './pages';
import { Spinner, Modal } from '../../components';
import { useAppContext } from '../../../core/app/App.context';
import './Dashboard.view.css'
import { Introduction } from './sections';


const Dashboard = () => {
  const { user, currentOffice } = useAppContext(); 
  const { firstLogin } = user;
  const type = currentOffice ? currentOffice.tipo : undefined;
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
    {isIntroOpen &&     
      <Modal close={() => setIsIntroOpen()}>
        <Introduction close={() => setIsIntroOpen()} type={currentOffice.tipo} />
      </Modal>
    }
    {renderPage()}
    </>
  ); 
};


export default Dashboard;
