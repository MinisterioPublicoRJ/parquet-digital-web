// eslint-disable-next-line camelcase
const openCasesDetailsTransform = ({
  soma_ate_vinte = 0,
  soma_vinte_trinta = 0,
  soma_trinta_mais = 0,
}) => ({
  sumUntil20: soma_ate_vinte,
  sumBetween20And30: soma_vinte_trinta,
  sumBeyond30: soma_trinta_mais,
});

export default openCasesDetailsTransform;
