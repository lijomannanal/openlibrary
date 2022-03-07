import React from 'react';
import {
  render, within, fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Table from '../components/Table';

describe('Table Component', () => {
  const data = [
    {
      id: 'id1',
      Field2: [' Author1', 'Author2'],
      Field3: 'Test Book1',
    },
    {
      id: 'id2',
      Field2: [' Author1', 'Author2'],
      Field3: 'Test Book1',
    },

  ];

  const columns = [
    {
      name: 'Col1',
      field: 'id',
      type: 'string',
    },
    {
      name: 'Col2',
      field: 'Field2',
      type: 'list',
    },
    {
      name: 'Col3',
      field: 'Field3',
      type: 'string',
    },
  ];
  let rowClickFn: jest.Mock<any, any>;
  beforeEach(() => {
    rowClickFn = jest.fn();
  });

  test('should render Table component', () => {
    const { getByRole } = render(<Table
      data={data}
      columns={columns}
      onRowClick={rowClickFn}
    />);
    expect(getByRole('table')).toBeInTheDocument();
  });

  test('should render cells equal to the number of columns passed', () => {
    const { getAllByRole } = render(<Table
      data={data}
      columns={columns}
      onRowClick={rowClickFn}
    />);
    const cells = getAllByRole('columnheader') as HTMLElement[];
    expect(cells).toHaveLength(columns.length);
  });

  test('should show rows equal to the number of entries passed as data prop', () => {
    const { getAllByRole } = render(<Table
      data={data}
      columns={columns}
      onRowClick={rowClickFn}
    />);
    const rowgroups = getAllByRole('rowgroup') as HTMLElement[];
    const dataRows = within(rowgroups[1]).getAllByRole('row');
    expect(dataRows).toHaveLength(data.length);
  });
  test('should call the callback function on row click', () => {
    const { getAllByRole } = render(<Table
      data={data}
      columns={columns}
      onRowClick={rowClickFn}
    />);
    const tbody = getAllByRole('rowgroup') as HTMLElement[];
    const dataRows = within(tbody[1]).getAllByRole('row');
    act(async () => {
      fireEvent.click(dataRows[0]);
    });
    expect(rowClickFn).toHaveBeenCalledTimes(1);
  });
});
