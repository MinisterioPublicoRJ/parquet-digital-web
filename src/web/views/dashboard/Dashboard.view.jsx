import React, { useState } from 'react';
import { Pip, Tutela, AlternativeWelcome, Criminal, Generalist } from './pages';
import { Spinner, Modal } from '../../components';
import { useAppContext } from '../../../core/app/App.context';
// import Introduction from './sections/Introduction';
import NewParquetModal from './sections/NewParquetModal';

function Dashboard() {
  const { user, currentOffice } = useAppContext();
  const { firstLogin, firstLoginToday } = user;
  const type = currentOffice ? currentOffice.tipo : undefined;
  // const [isIntroOpen, setIsIntroOpen] = useState(firstLogin);
  const [modalNewParquet, setModalNewParquet] = useState(firstLoginToday);
  
  if (!user) {
    return <Spinner size="large" />;
  }

  function renderPage() {
    switch (type) {
      case 1:
        return <Tutela />;
      case 2:
        return <Pip />;
      case 3:
        return <Criminal />;
      case 4:
        return <Generalist />;

      default:
        return <AlternativeWelcome />;
    }
  }

  return (
    <>
      {/* {isIntroOpen && (
        <Modal transparent withExitButton unpositioned close={() => setIsIntroOpen()}>
          <Introduction close={() => setIsIntroOpen()} type={currentOffice.tipo} />
        </Modal>
      )} */}
      {modalNewParquet && (
        <Modal transparent withExitButton close={() => setModalNewParquet()}>
        <NewParquetModal type={currentOffice.tipo} />
      </Modal>
      )}
      {renderPage()}
    </>
  );
}

export default Dashboard;
