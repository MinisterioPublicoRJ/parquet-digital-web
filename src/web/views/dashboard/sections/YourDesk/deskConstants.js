export const PIP_DESK_BUTTONS = ['openCases', 'newDocs', 'closedCasesP'];

export const TUTELA_DESK_BUTTONS = ['openCases', 'newDocs', 'closedCasesT'];

export const CRIMINAL_DESK_BUTTONS = ['openCases','newDocs', 'closedCasesC']; 

export const PIP_COLLECTION_BUTTONS = ['pics', 'inquiries', 'aisps'];

export const TUTELA_COLLECTION_BUTTONS = [ 'openInvestigations','courtCases'];

export const CRIMINAL_COLLECTION_BUTTONS = ['criminalCourtCases' ]; 

export const CONTROL_BUTTONS = ['desk', 'collection', ];

export const CRONTROL_BUTTON_TEXTS = {
  desk: `Sua mesa`,
  collection: `Seu acervo`
}

export const BUTTON_TEXTS = {
  openCases: `Total de vistas\nabertas`,
  closedCasesP: `finalizados últimos 30 dias`,
  closedCasesT: `finalizados últimos 30 dias`,
  closedCasesC: `finalizados últimos 30 dias`,
  openInvestigations: `investigações\nem curso`,
  courtCases: `Número de processos\nem juízo`,
  criminalCourtCases: `Número de processos\nem juízo`,
  pics: 'Número de PICS',
  inquiries: 'Número de inquéritos',
  aisps: 'Na sua área de atribuição',
  newDocs: 'Documentos novos últimos 30 dias',
};

export const BUTTON_DICT = {
  openCases: 'vistas',
  newDocs: 'novos', 
  closedCasesP: 'pip_finalizados',
  closedCasesC: 'criminal_finalizados',
  closedCasesT: 'tutela_finalizados',
  pics: 'pip_pics',
  inquiries: 'pip_inqueritos',
  aisps: 'pip_aisp',
  openInvestigations: 'tutela_investigacoes',
  courtCases: 'tutela_processos',
  criminalCourtCases: 'criminal_processos'
};
