import React, { useState } from 'react';
import { Pip, Tutela, AlternativeWelcome, Criminal, Generalist } from './pages';
import { Spinner, Modal } from '../../components';
import { useAppContext } from '../../../core/app/App.context';
import  Introduction  from './sections/Introduction';

function Dashboard() {
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
      case 3:
        return (
          <Criminal />
        );
        case 4:
          return (
          <Generalist />
        );
        
      default:
        return <AlternativeWelcome />;
    }
  }

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
}


export default Dashboard;
