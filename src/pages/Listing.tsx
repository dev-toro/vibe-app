import { Box } from 'lucide-react';

import * as React from 'react';
import { getPackages } from '../services/packageService';
import type { Package } from '../services/packageService';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../components/ui/table';
import { PackageSearch } from '../components/PackageSearch';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';


const columnHelper = createColumnHelper<Package>();

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: info => (
      <span className="flex items-center gap-2">
        <Box className="w-4 h-4 text-blue-500" aria-label="package icon" />
        {info.getValue()}
      </span>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('description', {
    header: () => 'Description',
    cell: info => info.getValue(),
    enableSorting: false,
  }),
];


export default function Listing() {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const data = React.useMemo(() => getPackages(), []);
  const [search, setSearch] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: search,
      sorting,
    },
    onGlobalFilterChange: setSearch,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      // Only filter by name
      if (columnId === 'name') {
        const value = row.getValue('name');
        return typeof value === 'string' && value.toLowerCase().includes(filterValue.toLowerCase());
      }
      return true;
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h2 className="text-2xl font-bold mb-4">Package Listing</h2>
      <div className="w-full flex justify-center mb-4">
        <PackageSearch value={search} onChange={setSearch} />
      </div>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <span className="ml-1">
                        {header.column.getIsSorted() === 'asc' ? '▲' : header.column.getIsSorted() === 'desc' ? '▼' : ''}
                      </span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => navigate(`/package/${row.original.id}`)}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-gray-400 py-8">
                  No packages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
