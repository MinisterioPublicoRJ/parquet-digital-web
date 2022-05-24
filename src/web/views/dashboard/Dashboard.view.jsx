import React, { useState } from 'react';
import { Pip, Tutela, AlternativeWelcome } from './pages';
import { Spinner, Modal } from '../../components';
import { useAppContext } from '../../../core/app/App.context';
import  NewIntroduction  from './sections/Introduction/newIntroduction.jsx';


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
      <Modal transparent unpositioned close={() => setIsIntroOpen()}>
        <NewIntroduction close={() => setIsIntroOpen()} type={currentOffice.tipo} />
      </Modal>
    }
    {renderPage()}
    </>
  ); 
};


export default Dashboard;
