import React, { useState } from 'react';
import UserManual  from "../../views/dashboard/sections/UserManual/UserManual.view";
import  Introduction from "../../views/dashboard/sections/Introduction";
import { Modal } from '../../components/layoutPieces';
import { GlossaryBook, IntroScreenInterrogation } from '../../assets';
import { navBarLeftContent, logoutBtnVisible,
  logoutBtnVisibleIntro,
  navBarBoxContentTexts } from './navBarLeft.module.css'
import { useAppContext } from '../../../core/app/App.context';

function NavbarLeft() {
  const [modalType, setModalType] = useState(false);
  const { logout } = useAppContext();


  return (
  <div className={navBarLeftContent}>
    <div className={navBarBoxContentTexts}>
      <button
      type="button"
      onClick={() => setModalType('glossary')}
    >
      <GlossaryBook />
      </button>
    <p>Glossário</p>
    </div>
  {

    modalType === 'glossary' &&
    <Modal withExitButton close={setModalType}>
      <div>
      <UserManual/>
      </div>
    </Modal>
  }
  <div className={navBarBoxContentTexts}>
    <button type="button" 
    onClick={() => setModalType('introduction')}
    >
    <IntroScreenInterrogation />
    </button>
    <p>Manual de uso</p>
  </div>
  {       
    modalType === 'introduction' &&
    <Modal withExitButton close={setModalType}>
      <Introduction />
    </Modal>
  }
  <div className={ logoutBtnVisibleIntro }>
   <button
    type="button"
    className={ logoutBtnVisible }
    onClick={logout}
    >
      SAIR
    </button>
  </div>
</div>
  );
}

export default NavbarLeft;
