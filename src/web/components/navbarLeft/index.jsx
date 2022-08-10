import React, { useState } from 'react';
import UserManual  from "../../views/dashboard/sections/UserManual/UserManual.view";
import  Introduction from "../../views/dashboard/sections/Introduction";
import { Modal } from '../../components/layoutPieces';
import UserManualIcon from '../../assets/imgs/userManualIcon.png';
import MethodologicalNoteIcon from '../../assets/imgs/edit_note.png';
import LogoutIcon from '../../assets/imgs/logout.png';
import Updates from '../../assets/imgs/updates.png';
import UpdatesBlue from '../../assets/imgs/updatesBlue.png';


import { navBarLeftContent,
  logoutBtnVisible,
  navBarBoxContentTexts
} from './navBarLeft.module.css'
import { useAppContext } from '../../../core/app/App.context';

function NavbarLeft() {
  const [modalType, setModalType] = useState(false);
  const { logout } = useAppContext();
  const [hover, setHOver] = useState(false);

 

  return (
  <div className={navBarLeftContent}>
    <div className={navBarBoxContentTexts}
      onMouseOver={() => setHOver(true)}
      onMouseOut={() => setHOver(false)}
      >
      <button
      type="button"
      onClick={() => setModalType('glossary')}
    >
      <img height="100%" src={hover ? UpdatesBlue : Updates} alt="icone-atualizações" />
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
  <div className={ navBarBoxContentTexts }>
    <button
    type="button"
    className={ logoutBtnVisible }
    onClick={logout}
    >
    <img height="100%" src={LogoutIcon} alt="icone-nota-metodologica" />
    </button>
    <p>Sair</p>
    </div>
  </div>
  );
}

export default NavbarLeft;
