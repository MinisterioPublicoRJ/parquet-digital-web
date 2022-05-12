/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './styles.css';
import MANUALPIP from './userManualPdfs/manual_pip.pdf';
import { useAppContext } from '../../../../../core/app/App.context';

function UserManual() {
  const { currentOffice } = useAppContext();
  const { tipo } = currentOffice;
  console.log(tipo)

  return (
    <div className="glossary-wrapper">
      <div className="glossary-intro">
        <h2>Manual de uso Parquet Digital</h2>
        <p>
          Aqui você poderá conferir todos os termos usados para compor o painel bem como o
          significados e como cada índice é calculado.
        </p>
      </div>
      <div className="glossary-articles-wrapper">
        {tipo === 2 ?(
          <a 
          target="_blank"
          onClick={event => {
              event.preventDefault();
              window.open(MANUALPIP);
            }
          }
         >Clique aqui e abra o manual de uso da sua promotoria.
         </a>    
        ) : (
        <a 
         target="_blank"
         onClick={event => {
             event.preventDefault();
             window.open(MANUALPIP);
           }
         }
        >Clique aqui e abra o manual de uso da sua promotoria Tutela.
        </a>   
        )}     
      </div>
    </div>
  );
}

export default UserManual;
