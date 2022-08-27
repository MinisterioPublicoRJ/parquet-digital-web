import React, { useState } from 'react';
import { Pip, Tutela, AlternativeWelcome, Criminal } from './pages';
import { Spinner, Modal } from '../../components';
import { useAppContext } from '../../../core/app/App.context';
import  Introduction  from './sections/Introduction';

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
      case 7:
        return (
          <Criminal />
        );
      default:
        return <AlternativeWelcome />;
    }
  }
  console.log(type, currentOffice)

  return (
    <>
    {isIntroOpen &&     
      <Modal transparent unpositioned close={() => setIsIntroOpen()}>
        <Introduction close={() => setIsIntroOpen()} type={currentOffice.tipo} />
      </Modal>
    }
    {renderPage()}
    </>
  ); 
};


export default Dashboard;
