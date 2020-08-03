import React, { useState } from 'react';

import { useAuth } from '../app/authContext';
import { Modal } from '../components';
import { Pip, Tutela, BlankPage } from './pages';
import {
  //IntroductionResume,
  //IntroductionYourDesk,
  //IntroductionPerfomanceRadar,
  IntroductionMainInvestigated,
  //IntroductionAlerts,
  //IntroductionSuccessIndicators,
  //IntroductionProcessingTime,
  //IntroductionProcessList,
  Glossary,
} from './sections';

function Dashboard() {
  const { user } = useAuth();
  const { tipoOrgao } = user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function renderPage() {
    switch (tipoOrgao) {
      case 1:
        return <Tutela />;
      case 2:
        return <Pip />;
      default:
        return <BlankPage />;
    }
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} onToggle={() => setIsModalOpen(oldState => !oldState)}>
        {/* <IntroductionResume /> */}
        {/* <IntroductionYourDesk /> */}
        {/* <IntroductionPerfomanceRadar /> */}
        {/*<IntroductionAlerts />*/}
        {/*<IntroductionProcessingTime />*/}
        {/*<IntroductionProcessList />*/}
        {/*<IntroductionSuccessIndicators />*/}
        {/*<IntroductionMainInvestigated />*/}
        <Glossary onToggle={() => setIsModalOpen(oldState => !oldState)} />
      </Modal>
      {renderPage()}
    </div>
  );
}

export default Dashboard;
