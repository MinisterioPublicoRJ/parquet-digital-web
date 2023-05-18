import React, { useState } from 'react';
import UserManual from '../../views/dashboard/sections/UserManual/UserManual.view';
import Introduction from '../../views/dashboard/sections/Introduction';
import MethodologicalNote from '../../views/dashboard/sections/MethodologicalNote/MethodologicalNote.view';
import { Modal } from '../layoutPieces';
import UserManualIcon from '../../assets/svg/UserManualIcon';
import InfoIcon from '../../assets/svg/InfoIcon';
import EditNoteIcon from '../../assets/svg/EditNoteIcon';
import SpeedIcon from '../../assets/svg/SpeedIcon';
import LogoutIcon from '../../assets/svg/LogoutIcon';
import UpdatesIcon from '../../assets/svg/UpdatesIcon';
import {
  navBarLeftContent,
  topButtonDiv,
  navBarBoxContentTexts,
  logOutPositionDiv,
  userManualDiv,
  notaMetodologicaDiv,
  infosDiv,
  tempoTramitacaoDiv,
  logOutButtonDiv,
} from './navBarLeft.module.css';
import { useAppContext } from '../../../core/app/App.context';
import ProcessingTime from '../../views/dashboard/sections/ProcessingTime';

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
      {/* <div className={navBarBoxContentTexts}
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
    </div> */}
      {modalType === 'manual' && (
        <Modal withExitButton close={setModalType}>
          <div>
            <UserManual />
          </div>
        </Modal>
      )}
      <div className={topButtonDiv}>
        <div
          className={userManualDiv}
          onMouseOver={() => setHoverUserManual(true)}
          onFocus={() => setHoverUserManual(true)}
          onMouseOut={() => setHoverUserManual(false)}
          onBlur={() => setHoverUserManual(false)}
          onClick={() => setModalType('manual')}
        >
          <button type="button">
            {hoverUserManual ? <UserManualIcon fill="#154763" /> : <UserManualIcon />}
          </button>
          <p>Manual de uso</p>
        </div>
        {/*{modalType === 'notaMetodologica' && (
          <Modal withExitButton close={setModalType}>
            <div>
              <MethodologicalNote />
            </div>
          </Modal>
        )}
        <div
          className={notaMetodologicaDiv}
          onMouseOver={() => setHoverNotaMetodologica(true)}
          onFocus={() => setHoverNotaMetodologica(true)}
          onMouseOut={() => setHoverNotaMetodologica(false)}
          onBlur={() => setHoverNotaMetodologica(false)}
          onClick={() => setModalType('notaMetodologica')}
        >
          <button type="button">
            {hoverNotaMetodologica ? <InfoIcon fill="#154763" /> : <InfoIcon />}
          </button>
          <p>Nota Metodológica</p>
        </div>*/}
        {modalType === 'introduction' && (
          <Modal withExitButton close={setModalType}>
            <Introduction />
          </Modal>
        )}
        <div
          className={infosDiv}
          onMouseOver={() => setHover(true)}
          onFocus={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onBlur={() => setHover(false)}
          onClick={() => setModalType('introduction')}
        >
          <button className="button" type="button">
            {hover ? <EditNoteIcon fill="#154763" /> : <EditNoteIcon />}
          </button>
          <p>Informações</p>
        </div>
        {modalType === 'tramitacao' && (
          <Modal withExitButton close={setModalType}>
            <ProcessingTime />
          </Modal>
        )}
        <div
          className={tempoTramitacaoDiv}
          onMouseOver={() => setHoverTempoTramitacao(true)}
          onFocus={() => setHoverTempoTramitacao(true)}
          onMouseOut={() => setHoverTempoTramitacao(false)}
          onBlur={() => setHoverTempoTramitacao(false)}
          onClick={() => setModalType('tramitacao')}
        >
          <button type="button">
            {hoverTempoTramitacao ? <SpeedIcon fill="#154763" /> : <SpeedIcon />}
          </button>
          <p>Tempo de tramitação</p>
        </div>
      </div>
      <div className={logOutPositionDiv}>
        <div
          className={logOutButtonDiv}
          style={{ marginTop: '12.300rem' }}
          onMouseOver={() => setHoverLogout(true)}
          onFocus={() => setHoverLogout(true)}
          onMouseOut={() => setHoverLogout(false)}
          onBlur={() => setHoverLogout(false)}
          onClick={logout}
        >
          <button type="button">
            {hoverLogout ? <LogoutIcon fill="#154763" /> : <LogoutIcon />}
          </button>
          <p>Sair</p>
        </div>
      </div>
    </div>
  );
}

export default NavbarLeft;
