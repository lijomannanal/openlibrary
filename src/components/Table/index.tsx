import React from 'react';
import './style.scss';

type ColTypes = {
  name: string,
  field: string,
  type: string,
};

const StyledTable = <ItemType extends { id: string, [key: string]: any }>
(props: { data: ItemType[], columns: ColTypes[],
  onRowClick:(item: ItemType) => void }) => {
  const { data, columns, onRowClick } = props;
  return (
    <table>
      <thead>
        <tr>
          {
            columns.map(({ name }) => (
              <th key={name}>{name}</th>))
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map((item) => (
            <tr onClick={() => onRowClick(item)} key={item.id}>
              {
                columns.map(({ field: fieldName, type }) => {
                  let cellData;
                  if (type === 'list') {
                    cellData = item[fieldName as keyof ItemType].join('<br>');
                  } else {
                    cellData = item[fieldName as keyof ItemType];
                  }
                  return (
                    <td key={fieldName}>
                      { cellData}
                    </td>
                  );
                })
              }
            </tr>
          ))
        }
        {
          !data.length && (
            <tr>
              <td colSpan={columns.length}>No data found</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
};
export default StyledTable;
