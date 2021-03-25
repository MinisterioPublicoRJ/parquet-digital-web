import React from 'react';

export const OVERLAY_TEXTS = {
  GATE: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar sobre Instruções Técnicas do GATE que foram elaboradas
        entre a última vez que você viu este procedimento e a data de hoje.
      </p>

      <p />

      <p>
        Para que o alerta deixe de aparecer, basta que você receba o procedimento para trabalhar
        novamente, ou que aperte o botão dispensar. Enquanto ele está disponível, você pode pedir
        para baixar IT e eu busco ela no GATE, deixando disponível tanto para leitura quanto para
        download em nova aba do navegador.
      </p>
    </div>
  ),
  MCSI: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar sobre Instruções Técnicas da CSI que foram elaboradas
        entre a última vez que você viu este procedimento e a data de hoje.
      </p>

      <p />

      <p>
        Para que o alerta deixe de aparecer, basta que você receba o procedimento para trabalhar
        novamente, ou que você aperte o botão dispensar. Enquanto ele está disponível, você pode
        pedir para baixar IT e eu busco ela na CSI para você, deixando disponível tanto para leitura
        quanto para download em nova aba do navegador.
      </p>
    </div>
  ),
  MVVD: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar sobre vítimas que reconheci que apareceram mais de uma
        vez em documentos que versam sobre violência doméstica.
      </p>

      <p />

      <p>
        O alerta só aparece se o documento passou por aqui nos últimos 30 dias, mas você também
        poderá dispensar sempre que quiser.
      </p>
    </div>
  ),
  OUVI: (
    <div>
      <p>
        Neste alerta, eu busco lhe avisar que um expediente de ouvidoria não foi recebido nesta
        Promotoria de Justiça, apesar de ter guia de enviado para cá.
      </p>

      <p />

      <p>
        Para que o alerta deixe de aparecer, basta receber a guia e promover o lançamento da data de
        recebimento no MGP.
      </p>
    </div>
  ),
  NF30: (
    <div>
      <p>
        Neste alerta, eu busco lhe avisar que uma notícia de fato foi autuada há mais de 30 
        dias e não teve uma destinação dada.
      </p>

      <p />

      <p>
        Para que o alerta deixe de aparecer, basta indeferir de plano ou instaurar procedimento e registrar no sistema.
      </p>
    </div>
  ),
  NF120: (
    <div>
      <p>
        Neste alerta, eu busco lhe avisar que uma notícia de fato foi autuada há mais de 120 dias e
        não teve uma destinação dada.
      </p>

      <p />

      <p>
        Para que o alerta deixe de aparecer, basta indeferir de plano ou instaurar procedimento e
        registrar no sistema.
      </p>
    </div>
  ),
  VADF: (
    <div>
      <p>
        Neste alerta, eu busco lhe avisar que um documento que está registrado como fechado está com
        vista aberta em sua mesa. Neste caso, o documento provavelmente não deveria estar ali, ou
        está com registro muito errado no banco.
      </p>

      <p />

      <p>
        Para que o alerta deixe de aparecer, basta fechar a vista, retornar o procedimento ao
        arquivo, ou, caso seja hipótese de erro de registro, pedir a retificação no MGP.
      </p>
    </div>
  ),
  DT2I: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar que este procedimento no qual você trabalhou teve um
        movimento processual na segunda instância. Isso pode te permitir acompanhar o andamento do
        que você fez na instância superior, finalmente obtendo o conhecimento do resultado final de
        seu trabalho.
      </p>

      <p />

      <p>
        O alerta só fica disponível para visualização por uma semana, então não se preocupe, pois
        ele irá sumir sozinho. De todo modo, caso não queira mais vê-lo, pode clicar na opção
        dispensar.
      </p>
    </div>
  ),
  RO: (
    <div>
      <p>
        Esta é uma listagem de todos R.O.s da referida Delegacia que não foram encaminhados ao
        Ministério Público.
      </p>

      <p />

      <p>
        Sua elaboração considera o número mais alto de registro enviado ao MP e o fato de se tratar
        de uma numeração contínua, indicando que todos os anteriores são existentes. A partir disso
        são excluídos os números de registro que já passaram no MPRJ e elaborada a lista final com
        os demais números.
      </p>
    </div>
  ),
  FEBT: (
    <p>
      Neste alerta eu tento lhe sinalizar quando a delegacia parou de enviar ROs novos, mais
      recentes. Para fazer isso, eu procuro na lista (numérica e crescente) de ROs, por delegacia,
      qual foi o último número a entrar no MPRJ. Assim que eu encontro, vejo qual foi a data de sua
      entrada e identifico se há mais de um mês não houve entrada de um número de RO mais recente.
      Se isso ocorre, eu lhe aviso que a delegacia parou de mandar novos ROs para lhe ajudar no seu
      trabalho de controle externo da polícia.
    </p>
  ),
};

export const PRCR_TEXTS = (type, data) => {
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

          {data.map((crime, index) => (
            <div className="crime-data" key={crime.key}>
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

          {data.map((crime, index) => (
            <div className="crime-data" key={crime.key}>
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

          {data.map((crime, index) => (
            <div className="crime-data" key={crime.key}>
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

          {data.map((crime, index) => (
            <div className="crime-data" key={crime.key}>
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
            ocorrer a data de prescrição deste crime, este alerta deixará de existir para se tornar
            um alerta de que algum crime deste procedimento prescreveu, mas não todos, indicando que
            ainda há o que possa ser trabalhado, apesar da prescrição ocorrida.
          </p>
        </>
      );
    default:
  }
};

export const IC1A_TEXT = ({ movement, movementDate, deadline }) => (
  <div>
    <p>
      Neste alerta, eu busco lhe informar se um Inquérito Civil está há mais de um ano sem
      prorrogação.
    </p>

    <p />

    <p>
      {`Neste caso, ele fez um ano sem prorrogação no dia ${deadline}, após ter ocorrido a
      ${movement} no dia ${movementDate}.`}
    </p>

    <p />

    <p>
      Caso você concorde com meus cálculos, você pode utilizar o botão de gerar peça e eu lhe
      entrego um modelo de sugestão.
    </p>
  </div>
);

export const PA1A_TEXT = ({ deadline, registerDate }) => (
  <div>
    <p>
      Neste alerta, eu busco lhe informar se um Procedimento Administrativo está aberto há mais de
      um ano.
    </p>

    <p />

    <p>
      {`Neste caso, ele fez um ano no dia ${deadline}, após ter sido cadastrado no nosso sistema
      no dia ${registerDate}.`}
    </p>

    <p />

    <p>
      Caso você concorde com meus cálculos e queira convertê-lo em Inquérito Civil, você pode
      utilizar o botão de gerar peça e eu lhe entrego um modelo de sugestão.
    </p>
  </div>
);

export const PPFP_TEXT = ({ registerDate }) => (
  <div>
    <p>Neste alerta, eu busco lhe informar se um Procedimento Preparatório está fora do prazo.</p>

    <p />

    <p>
      Neste caso, o alerta aparece se o Procedimento Preparatório foi criado no sistema e se
      passaram mais de 30 dias sem prorrogação, ou se, mesmo após a prorrogação, já se passaram mais
      de 180 dias de sua criação.
    </p>

    <p />

    <p>
      {`Este procedimento foi cadastrado no nosso sistema no dia ${registerDate} e agora ele se
      encontra fora do prazo.`}
    </p>

    <p />

    <p>
      Caso você concorde com meus cálculos e queira convertê-lo em Inquérito Civil, você pode
      utilizar o botão de gerar peça e eu lhe entrego um modelo de sugestão.
    </p>
  </div>
);
