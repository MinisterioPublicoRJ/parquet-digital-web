import React from 'react';

const Head = ({keys}) => {
  return (
    <thead>
      <tr>
        {keys.map(key => (
          <th key={key}>{key}</th>
        ))}
      </tr>
    </thead>
  );
};
const Row = ({ record }) => {
  return (
    <tr>
      <td>{record.docu_nr_mp}</td>
      <td>{record.docu_nr_externo}</td>
      <td>{record.dt_ultimo_andamento}</td>
      <td>{record.classe_documento}</td>
    </tr>
  );
};
const TableProcesses = ({ data, list }) => {
  const keys = Object.keys(data[0]);
  return (
    <table>
      <Head keys={keys}/>
      <tbody>
        {list.map(record => (
          <Row record={record} />
        ))}
      </tbody>
    </table>
  );
};

export default TableProcesses;
