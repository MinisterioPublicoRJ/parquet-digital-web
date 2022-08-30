import React, { useState } from 'react';
import UserManual  from "../../views/dashboard/sections/UserManual/UserManual.view";
import  Introduction from "../../views/dashboard/sections/Introduction";
import  MethodologicalNote from "../../views/dashboard/sections/MethodologicalNote/MethodologicalNote.view";
import { Modal } from "../layoutPieces";
import EditNoteBlue from '../../assets/imgs/edit_note_blue.png';
import EditNote from '../../assets/imgs/edit_note.png';
import LogoutIcon from '../../assets/imgs/logout.png';
import LogoutIconBlue from '../../assets/imgs/logout_blue.png';
import UserManualIcon from '../../assets/imgs/userManualIcon.png';
import UserManualIconBlue from '../../assets/imgs/userManualIconBlue.png';
import Updates from '../../assets/imgs/updates.png';
import UpdatesBlue from '../../assets/imgs/updatesBlue.png';
import Info from '../../assets/imgs/info.png';
import Speed from '../../assets/imgs/speed.png';
import InfoBlue from '../../assets/imgs/info-azul.png';
import { navBarLeftContent, navBarBoxContentTexts } from './navBarLeft.module.css'
import { useAppContext } from '../../../core/app/App.context';

function NavbarLeft() {
  const [modalType, setModalType] = useState(false);
  const { logout } = useAppContext();
  const [hoverUserManual, setHoverUserManual] = useState(false);
  const [hoverNotaMetodologica, setHoverNotaMetodologica] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);
  const [hoverTempoTramitacao, setHoverTempoTramitacao] = useState(false);
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
    modalType === 'manual' &&
    <Modal withExitButton close={setModalType}>
      <div>
      <UserManual/>
      </div>
    </Modal>
  }
    {
    modalType === 'notaMetodologica' &&
    <Modal withExitButton close={setModalType}>
      <div>
      <MethodologicalNote/>
      </div>
    </Modal>
  }
  <div className={navBarBoxContentTexts}
      onMouseOver={() => setHoverUserManual(true)}
      onFocus={() => setHoverUserManual(true)}
      onMouseOut={() => setHoverUserManual(false)}
      onBlur={() => setHoverUserManual(false)}
      onClick={() => setModalType('manual')}
      >
      <button
      type="button">
      <img src={hoverUserManual ? UserManualIconBlue : UserManualIcon} alt="icone-glossario" />
      </button>
    <p>Manual de uso</p>
  </div>
  <div className={navBarBoxContentTexts}
      onMouseOver={() => setHoverNotaMetodologica(true)}
      onFocus={() => setHoverNotaMetodologica(true)}
      onMouseOut={() => setHoverNotaMetodologica(false)}
      onBlur={() => setHoverNotaMetodologica(false)}
      onClick={() => setModalType('notaMetodologica')}
      >
      <button
      type="button">
      <img src={hoverNotaMetodologica ? InfoBlue : Info} alt="icone-nota-metodologica" />
      </button>
    <p>Nota Metodológica</p>
  </div>
  <div className={navBarBoxContentTexts}
    onMouseOver={() => setHover(true)}
    onFocus={() => setHover(true)}
    onMouseOut={() => setHover(false)}
    onBlur={() => setHover(false)}
    onClick={() => setModalType('introduction')}
  >
    <button type="button">
    <img src={hover ? EditNoteBlue : EditNote} alt="icone-manual de uso" />
    </button>
    <p>Informações</p>
  </div>
  <div className={navBarBoxContentTexts}
      onMouseOver={() => setHoverUserManual(true)}
      onFocus={() => setHoverUserManual(true)}
      onMouseOut={() => setHoverUserManual(false)}
      onBlur={() => setHoverUserManual(false)}
      onClick={() => setModalType('manual')}
      >
      <button
      type="button">
      <img src={hoverTempoTramitacao ? Speed : Speed} alt="icone-tempo de tramitação" />
      </button>
    <p>Tempo de tramitação</p>
  </div>
  {       
    modalType === 'introduction' &&
    <Modal withExitButton close={setModalType}>
      <Introduction />
    </Modal>
  }
  <div className={ navBarBoxContentTexts } style={{ marginTop: "18.300rem" }}
   onMouseOver={() => setHoverLogout(true)}
   onFocus={() => setHoverLogout(true)}
   onMouseOut={() => setHoverLogout(false)}
   onBlur={() => setHoverLogout(false)}
   onClick={logout}
  >
    <button type="button">
    <img src={hoverLogout ? LogoutIconBlue : LogoutIcon} alt="icone-logout" />
    </button>
    <p>Sair</p>
  </div>
  </div>
  );
}

export default NavbarLeft;
