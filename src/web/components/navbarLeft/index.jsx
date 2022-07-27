import React, { useState } from 'react';
import UserManual  from "../../views/dashboard/sections/UserManual/UserManual.view";
import  Introduction from "../../views/dashboard/sections/Introduction";
import { Modal } from '../../components/layoutPieces';
import { GlossaryBook, IntroScreenInterrogation } from '../../assets';
import { navBarLeftContent } from './navBarLeft.module.css'

function NavbarLeft() {
  const [modalType, setModalType] = useState(false);

  return (
  <div className={navBarLeftContent}>
  <button
    type="button"
    onClick={() => setModalType('glossary')}
  >
    <GlossaryBook />
  </button>
  {
    modalType === 'glossary' &&
    <Modal withExitButton close={setModalType}>
      <UserManual/>
    </Modal>
  }
  <button type="button" 
    onClick={() => setModalType('introduction')}
  >
    <IntroScreenInterrogation />
  </button>
  {       
    modalType === 'introduction' &&
    <Modal withExitButton close={setModalType}>
      <Introduction />
    </Modal>
  }
</div>
  );
}

export default NavbarLeft;
