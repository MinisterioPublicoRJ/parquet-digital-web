import React, { useState } from 'react';
import UserManual  from "../../views/dashboard/sections/UserManual/UserManual.view";
import  Introduction from "../../views/dashboard/sections/Introduction";
import { Modal } from '../../components/layoutPieces';
import UserManualIcon from '../../assets/imgs/userManualIcon.png';
import MethodologicalNoteIcon from '../../assets/imgs/edit_note.png';
import Updates from '../../assets/imgs/updates.png';

import { navBarLeftContent,
  logoutBtnVisible,
  logoutBtnVisibleIntro,
  navBarBoxContentTexts
} from './navBarLeft.module.css'
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
      <img height="100%" src={Updates} alt="icone-atualizações" />
      </button>
    <p>Atualizações</p>
    </div>
    <div className={navBarBoxContentTexts}>
      <button
      type="button"
      onClick={() => setModalType('glossary')}
    >
      <img height="100%" src={UserManualIcon} alt="icone-glossario" />
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
    <img height="100%" src={MethodologicalNoteIcon} alt="icone-nota-metodologica" />
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
