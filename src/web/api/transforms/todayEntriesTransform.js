const todayEntriesTransform = ({ hout = 0, lout = 0, nr_entradas_hoje = 0 }) => ({
  hout,
  lout,
  numEntries: nr_entradas_hoje,
});

export default todayEntriesTransform;
