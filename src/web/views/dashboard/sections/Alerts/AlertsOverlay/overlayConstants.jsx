/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { crimeData } from './styles.module.css';

export const OVERLAY_TEXTS = {
  IIMP: (
    <div>
      <p>
        Esse alerta indica os inquéritos civis de improbidade administrativa já em curso na data de
        vigência da Lei nº 14.230/2021 e que devem ser prorrogados, considerando a interpretação do
        art. 23, §2º da Lei 8.429/1992 pelo enunciado nº 11 da Súmula do CSMP.
      </p>

      <p>
        Enunciado 11 da Súmula do CSMP: "O inquérito civil já em curso na data de vigência da Lei nº
        14.230/2021 deverá ser concluído no prazo de 365 dias, a contar da data de vigência da
        referida lei, com a possibilidade de prorrogação pelo mesmo período, mediante promoção
        fundamentada, a ser encaminhada por cópia ao Conselho Superior do Ministério Público para
        revisão. " (Aprovada na sessão de 28 de abril de 2022)
      </p>
    </div>
  ),
  GATE: (
    <div>
      <p>
        O alerta indica que foi disponibilizada IT do GATE depois da última vista aberta no
        documento. É possível solicitar abertura de vista do documento para trabalhar nele
        novamente. Outra opção é realizar o download ou a leitura da IT.
      </p>
    </div>
  ),
  MCSI: (
    <div>
      <p>
        O alerta indica que foi disponibilizada IT da CSI depois da última vista aberta no
        documento.
      </p>

      <p>
        É possível solicitar abertura de vista do documento para trabalhar nele novamente. Outra
        opção é realizar o download ou a leitura da IT.
      </p>
    </div>
  ),
  MVVD: (
    <div>
      <p>
        O alerta indica que foi cadastrado um novo documento da matéria "Violência Doméstica e
        Familiar contra a Mulher" nos últimos 30 dias e a vítima (autor e/ou vítima) já figura em
        outro documento da mesma matéria.
      </p>
    </div>
  ),
  OUVI: (
    <div>
      <p>
        O alerta indica que foi remetido um expediente de Ouvidoria com guia de envio para esta
        promotoria de justiça, mas não foi registrado seu recebimento. É possível receber a guia e
        promover o lançamento da data de recebimento no MGP.
      </p>
    </div>
  ),
  NF30: (
    <div>
      <p>
        O alerta indica as Notícias de Fato que estão há mais de 30 dias sem movimentos de
        finalização, autuação ou prorrogação. É possível baixar uma planilha Excel com as Notícias
        de Fato que demandam sua atenção.
      </p>
    </div>
  ),
  NF120: (
    <div>
      <p>
        O alerta indica as Notícias de Fato que estão há mais de 120 dias sem movimentos de
        finalização, autuação ou prorrogação. É possível baixar uma planilha Excel com as Notícias
        de Fato que demandam sua atenção.
      </p>
    </div>
  ),
  VADF: (
    <div>
      <p>
        O alerta indica que um documento em fase “Finalizado” está com vista aberta para o promotor.
      </p>

      <p>
        É recomendável verificar a fase do documento e eventualmente, se necessário, promover
        retificações no MGP
      </p>
    </div>
  ),
  DT2I: (
    <div>
      <p>
        O alerta indica que houve um movimento processual na segunda instância em um processo que já
        foi trabalhado nesta promotoria de justiça.
      </p>
    </div>
  ),
  RO: (
    <div>
      <p>
        O alerta apresenta uma listagem de todos ROs da referida Delegacia que não foram enviados ao
        MPRJ.
      </p>
    </div>
  ),
  FEBT: (
    <p>
      O alerta indica que não foram identificados no MGP novos ROs da referida delegacia nos últimos
      30 dias.
    </p>
  ),
  CTAC: (
    <div>
      <p>O alerta indica que houve celebração de TAC, mas ainda não foi comunicado ao CSMP.</p>
    </div>
  ),
  DCTJ: (
    <div>
      <p>
        O alerta indica os Processos Criminais que foram remetidos ao TJRJ há mais de 60 dias e
        menos de 180 dias e ainda não retornaram à promotoria de justiça
      </p>

      <p>
        Sugere-se receber o processo no sistema, caso tenha remessa ao MPRJ, ou requerer abertura de
        vista do documento, caso esteja com carga no Tribunal. A lista de todos os documentos nestas
        condições está disponível para download em formato de planilha Excel
      </p>
    </div>
  ),
  DCTJ2: (
    <div>
      <p>
        O alerta indica os Processos Criminais que foram remetidos ao TJRJ há mais de 180 dias e
        ainda não retornaram à promotoria de justiça
      </p>

      <p>
        Sugere-se receber o processo no sistema, caso tenha remessa ao MPRJ, ou requerer abertura de
        vista do documento, caso esteja com carga no Tribunal. A lista de todos os documentos nestas
        condições está disponível para download em formato de planilha Excel
      </p>
    </div>
  ),
  DNTJ: (
    <div>
      <p>
        O alerta indica os processos não criminais que foram enviados ao TJRJ há mais de 120 dias e
        ainda não retornaram para a Promotoria de Justiça.
      </p>

      <p>
        Sugere-se receber o processo no sistema, caso tenha remessa ao MPRJ, ou requerer abertura de
        vista do documento, caso esteja com carga no Tribunal. A lista de todos os documentos nestas
        condições está disponível para download em formato de planilha Excel.
      </p>
    </div>
  ),
  onDel: (
    <div>
      <p>
        Somente membros podem descartar definitivamente um alerta. Servidores só podem descartar
        para o seu próprio usuário e somente durante o uso nesta sessão.
      </p>
      <p>
        Tem certeza de que deseja continuar esta ação? Caso desista, clique em &quot;Desfazer&quot;.
      </p>
    </div>
  ),
};

export function PRCR_TEXTS(type, data) {
  switch (type) {
    case 'PRCR1':
      return (
        <>
          <p>
            Neste alerta, eu busco lhe informar sobre quais procedimentos possivelmente contêm todos
            os seus crimes já prescritos na data de hoje.
          </p>

          <p>
            Meus cálculos são feitos com base nas regras gerais do Código Penal e se houver algum
            erro ou falta de registro nos bancos de dados, eles podem não ser perfeitos. Caso isso
            seja corrigido, minha precisão melhora bastante!
          </p>

          <p>Para este caso, meus cálculos foram os seguintes:</p>

          {data.map((crime) => (
            <div className={crimeData} key={crime.key}>
              <p>
                <b>Personagem:</b>
                {` ${crime.investigatedName}`}
              </p>

              <p>
                <b>Tipo Penal:</b>
                {` ${crime.penalType}`}
              </p>

              <p>
                <b>Máximo de Pena:</b>
                {` ${crime.maximumPenalty}`}
              </p>

              <p>
                <b>Data de início:</b>
                {` ${crime.prescriptionInitialDate}`}
              </p>

              <p>
                <b>Data de prescrição:</b>
                {` ${crime.prescriptionFinalDate}`}
              </p>
            </div>
          ))}

          <p />

          <p>
            Como a data de prescrição está no passado, reconheço que há a prescrição que eu lhe
            alertei. Se eu estiver certo, você pode utilizar o botão de gerar peça e eu lhe entrego
            um modelo de sugestão.
          </p>
        </>
      );
    case 'PRCR2':
      return (
        <>
          <p>
            Neste alerta, eu busco lhe informar sobre quais procedimentos possivelmente têm todos os
            seus crimes prescrevendo em breve, permitindo que você tome alguma ação emergencial para
            evitar isso. Isso ocorre quando todos os crimes estão próximos de prescrever, mesmo que
            não haja algum prescrito, mas também quando algum ou alguns já prescreveram e aqueles
            que restaram no procedimento estão próximos de prescrever. O foco deste alerta é
            auxiliar a identificar o problema antes e não deixar ocorrer a prescrição no
            procedimento como um todo.
          </p>

          <p>
            Meus cálculos são feitos com base nas regras gerais do Código Penal e se houver algum
            erro ou falta de registro nos bancos de dados, eles podem não ser perfeitos. Caso isso
            seja corrigido, minha precisão melhora bastante!
          </p>

          <p>Para este caso, meus cálculos foram os seguintes:</p>
          {data.map((crime) => (
            <div className={crimeData} key={crime.key}>
              <p>
                <b>Personagem:</b>
                {` ${crime.investigatedName}`}
              </p>

              <p>
                <b>Tipo Penal:</b>
                {` ${crime.penalType}`}
              </p>

              <p>
                <b>Máximo de Pena:</b>
                {` ${crime.maximumPenalty}`}
              </p>

              <p>
                <b>Data de início:</b>
                {` ${crime.prescriptionInitialDate}`}
              </p>

              <p>
                <b>Data de prescrição:</b>
                {` ${crime.prescriptionFinalDate}`}
              </p>
            </div>
          ))}
          <p>
            Como a data de prescrição ocorrerá em menos de 90 dias, eu lhe alertei para ajudar nas
            medidas que podem ser tomadas.
          </p>

          <p />

          <p>
            Caso você acredite que não há o que fazer e é o caso de prescrição inevitável, assim que
            ocorrer a data de prescrição de todos os crimes, este alerta deixará de existir para se
            tornar um alerta de todos os crimes prescritos, permitindo que eu elabore uma minuta de
            arquivamento do procedimento caso você peça.
          </p>
        </>
      );
    case 'PRCR3':
      return (
        <>
          <p>
            Neste alerta, eu busco lhe informar sobre quais procedimentos possivelmente têm um de
            seus crimes já prescrito na data de hoje, mas ainda possuem algum outro crime
            investigado que não prescreveu, nem está perto de prescrever.
          </p>

          <p>
            Meus cálculos são feitos com base nas regras gerais do Código Penal e se houver algum
            erro ou falta de registro nos bancos de dados, eles podem não ser perfeitos. Caso isso
            seja corrigido, minha precisão melhora bastante!
          </p>

          <p>Para este caso, meus cálculos foram os seguintes:</p>

          {data.map((crime) => (
            <div className={crimeData} key={crime.key}>
              <p>
                <b>Personagem:</b>
                {` ${crime.investigatedName}`}
              </p>

              <p>
                <b>Tipo Penal:</b>
                {` ${crime.penalType}`}
              </p>

              <p>
                <b>Máximo de Pena:</b>
                {` ${crime.maximumPenalty}`}
              </p>

              <p>
                <b>Data de início:</b>
                {` ${crime.prescriptionInitialDate}`}
              </p>

              <p>
                <b>Data de prescrição:</b>
                {` ${crime.prescriptionFinalDate}`}
              </p>
            </div>
          ))}

          <p>
            Como a data de prescrição está no passado, reconheço que há a prescrição que eu lhe
            alertei. Todavia, há ainda outros crimes neste procedimento que não reconheci prescrição
            ou sua proximidade, razão pela qual somente dei este alerta.
          </p>
        </>
      );
    case 'PRCR4':
      return (
        <>
          <p>
            Neste alerta, eu busco lhe informar sobre quais procedimentos possivelmente têm algum de
            seus crimes prescrevendo em breve, permitindo que você tome alguma ação emergencial para
            evitar isso. Neste caso, não há nenhum crime prescrito no procedimento ainda e mesmo que
            este crime prescreva, outros delitos podem ainda ser perseguidos e processados. O alerta
            é bastante pontual para o que está próximo de vencer, permitindo que você tome alguma
            medida emergencial.
          </p>

          <p>
            Meus cálculos são feitos com base nas regras gerais do Código Penal e se houver algum
            erro ou falta de registro nos bancos de dados, eles podem não ser perfeitos. Caso isso
            seja corrigido, minha precisão melhora bastante!
          </p>

          <p>Para este caso, meus cálculos foram os seguintes:</p>

          {data.map((crime) => (
            <div className={crimeData} key={crime.key}>
              <p>
                <b>Personagem:</b>
                {` ${crime.investigatedName}`}
              </p>

              <p>
                <b>Tipo Penal:</b>
                {` ${crime.penalType}`}
              </p>

              <p>
                <b>Máximo de Pena:</b>
                {` ${crime.maximumPenalty}`}
              </p>

              <p>
                <b>Data de início:</b>
                {` ${crime.prescriptionInitialDate}`}
              </p>

              <p>
                <b>Data de prescrição:</b>
                {` ${crime.prescriptionFinalDate}`}
              </p>
            </div>
          ))}
          <p>
            Como a data de prescrição ocorrerá em menos de 90 dias, eu lhe alertei para ajudar nas
            medidas que podem ser tomadas.
          </p>

          <p>
            Caso você acredite que não há o que fazer e é o caso de prescrição inevitável, assim que
            ocorrer a data de prescrição deste crime, este alerta deixará de existir para se tornar
            um alerta de que algum crime deste procedimento prescreveu, mas não todos, indicando que
            ainda há o que possa ser trabalhado, apesar da prescrição ocorrida.
          </p>
        </>
      );
    default:
      return '';
  }
}

export function IC1A_TEXT({ movement, movementDate, deadline }) {
  return (
    <div>
      <p>
        Neste alerta, eu busco lhe informar se um Inquérito Civil está há mais de um ano sem
        prorrogação.
      </p>

      <p>
        {`Neste caso, ele fez um ano sem prorrogação no dia ${deadline}, após ter ocorrido a
      ${movement} no dia ${movementDate}.`}
      </p>

      <p>
        Caso você concorde com meus cálculos, você pode utilizar o botão de gerar peça e eu lhe
        entrego um modelo de sugestão.
      </p>
    </div>
  );
}

export function PA1A_TEXT({ deadline, registerDate }) {
  return (
    <div>
      <p>
        Neste alerta, eu busco lhe informar se um Procedimento Administrativo está aberto há mais de
        um ano.
      </p>

      <p>
        {`Neste caso, ele fez um ano no dia ${deadline}, após ter sido cadastrado no nosso sistema
      no dia ${registerDate}.`}
      </p>

      <p>
        Caso você concorde com meus cálculos e queira convertê-lo em Inquérito Civil, você pode
        utilizar o botão de gerar peça e eu lhe entrego um modelo de sugestão.
      </p>
    </div>
  );
}

export function PPFP_TEXT({ registerDate }) {
  return (
    <div>
      <p>Neste alerta, eu busco lhe informar se um Procedimento Preparatório está fora do prazo.</p>

      <p>
        Neste caso, o alerta aparece se o Procedimento Preparatório foi criado no sistema e se
        passaram mais de 30 dias sem prorrogação, ou se, mesmo após a prorrogação, já se passaram
        mais de 180 dias de sua criação.
      </p>

      <p>
        {`Este procedimento foi cadastrado no nosso sistema no dia ${registerDate} e agora ele se
      encontra fora do prazo.`}
      </p>

      <p>
        Caso você concorde com meus cálculos e queira convertê-lo em Inquérito Civil, você pode
        utilizar o botão de gerar peça e eu lhe entrego um modelo de sugestão.
      </p>
    </div>
  );
}

export function IIMP_TEXT(lastProrrogationDate) {
  const prorrogationText = lastProrrogationDate
    ? `O presente inquérito, contudo, já havia sido prorrogado no dia ${lastProrrogationDate} 
    com fulcro no artigo 25 da Resolução GPGJ 2.227/2018.`
    : 'Não houve prorrogações no presente inquérito';
  return (
    <div>
      <p>
        No dia 25/10/2022 completam-se 365 dias da vigência da Lei 14.230/2021. {prorrogationText}
      </p>
    </div>
  );
}
