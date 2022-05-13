import React from 'react';
import MANUALPIP from './userManualPdfs/manual_pip.pdf';
import { useAppContext } from '../../../../../core/app/App.context';
import {glossaryWrapper, glossaryIntro, glossaryArticlesWrapper} from './userManual.module.css'

function UserManual() {
  const { currentOffice } = useAppContext();
  const { tipo } = currentOffice;

  return (
    <div className={glossaryWrapper}>
      <div className={glossaryIntro}>
        <h2>Manual de uso Parquet Digital</h2>
        <p>
          Este manual visa auxiliar o usuário a potecializar a capacidade da ferramenta em solucionar
          demandas dentro de sua Promotoria de Justiça
        </p>
      </div>
      <div className={glossaryArticlesWrapper}>
        {tipo === 1 ?(
          <a 
          target="_blank"
          onClick={event => {
              event.preventDefault();
              window.open(MANUALPIP);
            }
          }
         >Clique aqui e abra o manual de uso da sua promotoria de tutela.
         </a>    
        ) : (
        <a 
         target="_blank"
         onClick={event => {
             event.preventDefault();
             window.open(MANUALPIP);
           }
         }
        >Clique aqui e abra o manual de uso da sua promotoria de pip.
        </a>   
        )}     
      </div>
    </div>
  );
}

export default UserManual;
