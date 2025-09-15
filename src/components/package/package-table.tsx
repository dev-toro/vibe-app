import * as React from 'react';
import { Box, MoreVertical, Star } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import type { Package } from '../../services/packageService';

const columnHelper = createColumnHelper<Package>();

function NameCell({ row, onToggleFavorite }: { row: any; onToggleFavorite: (id: string) => void }) {
  const pkg = row.original;
  return (
    <span className="flex items-center gap-2">
      <Box className="w-4 h-4" aria-label="package icon" />
      {pkg.name}
      {pkg.favorited && <Star className="w-4 h-4 text-yellow-400 ml-1" fill="#facc15" />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="ml-2 p-1 rounded hover:bg-gray-100"><MoreVertical className="w-4 h-4" /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onToggleFavorite(pkg.id)}>
            {pkg.favorited ? 'Remove from favorites' : 'Add to favorites'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  );
}

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: info => <NameCell row={info.row} onToggleFavorite={info.table.options.meta!.onToggleFavorite} />,
    enableSorting: true,
  }),
  columnHelper.accessor('description', {
    header: () => 'Description',
    cell: info => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor('lastAccessed', {
    header: () => 'Last Accessed',
    cell: info => new Date(info.getValue()).toLocaleString(),
    enableSorting: true,
    sortingFn: 'datetime',
  }),
  columnHelper.accessor('createdAt', {
    header: () => 'Created At',
    cell: info => new Date(info.getValue()).toLocaleString(),
    enableSorting: true,
    sortingFn: 'datetime',
  }),
];

type PackageTableProps = {
  packages: Package[];
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  onToggleFavorite: (id: string) => void;
};

export default function PackageTable({ packages, sorting, setSorting, onToggleFavorite }: PackageTableProps) {
  const navigate = useNavigate();
  const table = useReactTable({
    data: packages,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: { onToggleFavorite },
  });
  return (
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
  );
}