// eslint-disable-next-line camelcase
const openCasesDetailsTransform = ({
  soma_ate_vinte = 0,
  soma_vinte_trinta = 0,
  soma_trinta_mais = 0,
  // soma_full = 0,
}) => ({
  under20: soma_ate_vinte,
  between20And30: soma_vinte_trinta,
  over30: soma_trinta_mais,
  // allDate: soma_full,

 
});
export default openCasesDetailsTransform;

