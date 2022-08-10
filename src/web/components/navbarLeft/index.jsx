import React, { useState } from 'react';
import UserManual  from "../../views/dashboard/sections/UserManual/UserManual.view";
import  Introduction from "../../views/dashboard/sections/Introduction";
import { Modal } from '../../components/layoutPieces';
import EditNoteBlue from '../../assets/imgs/edit_note_blue.png';
import EditNote from '../../assets/imgs/edit_note.png';
import LogoutIcon from '../../assets/imgs/logout.png';
import LogoutIconBlue from '../../assets/imgs/logout_blue.png';
import UserManualIcon from '../../assets/imgs/userManualIcon.png';
import UserManualIconBlue from '../../assets/imgs/userManualIconBlue.png';
import Updates from '../../assets/imgs/updates.png';
import UpdatesBlue from '../../assets/imgs/updatesBlue.png';

import { navBarLeftContent,
  navBarBoxContentTexts,
  logoutBtn
} from './navBarLeft.module.css'
import { useAppContext } from '../../../core/app/App.context';

function NavbarLeft() {
  const [modalType, setModalType] = useState(false);
  const { logout } = useAppContext();
  const [hoverUserManual, setHoverUserManual] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);
  const [hover, setHover] = useState(false);


  return (
  <div className={navBarLeftContent}>
    {/*<div className={navBarBoxContentTexts}
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
    </div>*/}
  {
    modalType === 'glossary' &&
    <Modal withExitButton close={setModalType}>
      <div>
      <UserManual/>
      </div>
    </Modal>
  }
  <div className={navBarBoxContentTexts}
      onMouseOver={() => setHoverUserManual(true)}
      onMouseOut={() => setHoverUserManual(false)}
      >
      <button
      type="button"
      onClick={() => setModalType('glossary')}
    >
      <img src={hoverUserManual ? UserManualIconBlue : UserManualIcon} alt="icone-glossario" />
      </button>
    <p>Glossário</p>
  </div>
  <div className={navBarBoxContentTexts}
    onMouseOver={() => setHover(true)}
    onMouseOut={() => setHover(false)}
  >
    <button type="button" 
    onClick={() => setModalType('introduction')}
    >
    <img src={hover ? EditNoteBlue : EditNote} alt="icone-manual de uso" />
    </button>
    <p>Manual de uso</p>
  </div>
  {       
    modalType === 'introduction' &&
    <Modal withExitButton close={setModalType}>
      <Introduction />
    </Modal>
  }
  <div className={ navBarBoxContentTexts } style={{ marginTop: "20.0rem" }}
   onMouseOver={() => setHoverLogout(true)}
   onMouseOut={() => setHoverLogout(false)}
  >
    <button
    type="button"
    className={ logoutBtn }
    onClick={logout}
    >
    <img src={hoverLogout ? LogoutIconBlue : LogoutIcon} alt="icone-logout" />
    </button>
    <p>Sair</p>
  </div>
  </div>
  );
}

export default NavbarLeft;
