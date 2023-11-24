export const PIP_DESK_BUTTONS = ['openCases', 'newDocs', 'closedCasesP'];

export const TUTELA_DESK_BUTTONS = ['openCases', 'newDocs', 'closedCasesT'];

export const CRIMINAL_DESK_BUTTONS = ['openCases', 'newDocs', 'closedCasesC'];

export const GENERALIST_DESK_BUTTONS = ['openCases', 'newDocs', 'closedCasesC'];

export const PIP_COLLECTION_BUTTONS = ['pics', 'inquiries', 'aisps'];

export const TUTELA_COLLECTION_BUTTONS = ['courtCases', 'openInvestigationsT'];

export const CRIMINAL_COLLECTION_BUTTONS = ['criminalCourtCases'];

export const GENERALIST_COLLECTION_BUTTONS = ['courtCases','openInvestigationsG', 'factualNews'];

export const CONTROL_BUTTONS = ['desk', 'collection',];

export const CRONTROL_BUTTON_TEXTS = {
  desk: `Sua mesa`,
  collection: `Seu acervo`
}

export const BUTTON_TEXTS = {
  openCases: `Total de vistas\nabertas`,
  closedCasesP: `finalizados últimos 30 dias`,
  closedCasesT: `finalizados últimos 30 dias`,
  closedCasesC: `finalizados últimos 30 dias`,
  courtCases: `Número de processos\nem juízo`,
  openInvestigationsT: `Investigações\nem curso`,
  criminalCourtCases: `Número de processos\nem juízo`,
  pics: 'Número de PICS',
  inquiries: 'Número de inquéritos',
  aisps: 'Na sua área de atribuição',
  newDocs: 'Documentos novos últimos 30 dias',
  factualNews: 'Notícias de fato',
  generalistCourtCases: `Número de processos\nem juízo`,
  openInvestigationsG: 'Investigações\nem curso'

};

export const BUTTON_COLORS = {
  openCases: "white",
  closedCasesP: "green",
  closedCasesT: "green",
  closedCasesC: "green",
  openInvestigationsT: "gray",
  openInvestigationsG: "gray",
  courtCases: "gray",
  criminalCourtCases: "gray",
  pics: "gray",
  inquiries: "gray",
  aisps: "gray",
  newDocs: "blue",
  factualNews: "gray",
};

export const BUTTON_DICT = {
  openCases: 'vistas',
  newDocs: 'novos',
  closedCasesP: 'pip_finalizados',
  closedCasesC: 'criminal_finalizados',
  closedCasesT: 'tutela_finalizados',
  closedCasesG: 'generalista_finalizados',
  pics: 'pip_pics',
  inquiries: 'pip_inqueritos',
  aisps: 'pip_aisp',
  openInvestigationsT: 'tutela_investigacoes',
  courtCases: 'tutela_processos',
  criminalCourtCases: 'criminal_processos',
  generalistaCourtCases: '',
  factualNews: '',
  openInvestigationsG: ''
};
