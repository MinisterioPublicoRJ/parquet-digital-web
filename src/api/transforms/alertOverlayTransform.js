import prescribedCrimeTransform from './prescribedCrimeTransform';

function ic1aTransform({ desc_movimento, dt_movimento, dt_fim_prazo }) {
  return {
    movement: desc_movimento,
    movementDate: dt_movimento ? Intl.DateTimeFormat().format(new Date(dt_movimento)) : null,
    deadline: dt_fim_prazo ? Intl.DateTimeFormat().format(new Date(dt_fim_prazo)) : null,
  };
}

function pa1aTransform({ dt_fim_prazo, docu_dt_cadastro }) {
  return {
    deadline: dt_fim_prazo ? Intl.DateTimeFormat().format(new Date(dt_fim_prazo)) : null,
    registerDate: docu_dt_cadastro
      ? Intl.DateTimeFormat().format(new Date(docu_dt_cadastro))
      : null,
  };
}

function ppfpTransform({ docu_dt_cadastro }) {
  return {
    registerDate: docu_dt_cadastro
      ? Intl.DateTimeFormat().format(new Date(docu_dt_cadastro))
      : null,
  };
}

export default function alertOverlayTransform(type, data) {
  switch (type) {
    case 'prescricao':
      return prescribedCrimeTransform(data);
    case 'IC1A':
      return ic1aTransform(data);
    case 'PA1A':
      return pa1aTransform(data);
    case 'PPFP':
      return ppfpTransform(data);
    default:
      return data;
  }
}
