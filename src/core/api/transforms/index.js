export * from './loginTransform';

export { default as todayEntriesTransform } from './todayEntriesTransform';
export { default as todayOutliersTransform } from './todayOutliersTransform'
export { default as openCasesDetailsTransform } from './openCasesDetailsTransform'
export { default as deskTabTransform } from './deskTabTransforms';

export const todayOutTransform = ({ percent_rank }) => percent_rank;

export const deskIntegratedTransform = ({ nr_documentos }) => nr_documentos;
