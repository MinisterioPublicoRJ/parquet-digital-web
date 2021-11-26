import React, { useState } from 'react';
import { Pip, Tutela, AlternativeWelcome } from './pages';
import { Spinner, Modal } from '../../components';
import { useAppContext } from '../../../core/app/App.context';
import './Dashboard.view.css'
import { Introduction } from './sections';


const Dashboard = ({ close }) => {
  const { user, currentOffice } = useAppContext(); 
  const { firstLogin } = useAppContext().user;
  const type = currentOffice ? currentOffice.tipo : undefined;
  const [modalType, setModalType] = useState(false);


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
      {!firstLogin && 
       <Modal close={setModalType}>
        <Introduction onToggle={setModalType} type={type} />
       </Modal>
      }
      {renderPage()}
    </>
  ); 
};


export default Dashboard;
