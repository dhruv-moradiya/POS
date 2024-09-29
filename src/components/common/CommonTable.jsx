import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React, { useState } from "react";

function CommonTable({
  data,
  columns,
  pagination,
  expandRowContent: ExpandRowContent,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={`${headerGroup.id}_${header.id}`}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {header.isPlaceholder ? null : (
                    <div className="p-1 text-start font-medium">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <span>⬆️</span>,
                        desc: <span>⬇️</span>,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <React.Fragment key={row.id}>
              <tr className="mb-2">
                {row.getVisibleCells().map((cell) => (
                  <td key={`${row.id}_${cell.column.id}`}>
                    <div
                      className={`p-2 ${
                        index % 2 === 0 ? "bg-white" : "bg-culture-white"
                      } rounded-md`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && <ExpandRowContent row={row} />}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {pagination && <Pagination table={table} />}
    </>
  );
}

export default CommonTable;

function Pagination({ table }) {
  return (
    <div className="w-full flex items-center gap-2 px-2">
      <div className="flex-1 flex items-center gap-2">
        <p>Total: Data length</p>
        <p>Items per page</p>
        <select
          className="rounded-lg p-1"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[8, 12, 16, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-1 rounded-md bg-amber-sea cursor-pointer"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft size={18} color="white" />
        </button>
        <button
          className="p-1 rounded-md bg-amber-sea cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={18} color="white" />
        </button>
        <input
          className="p-1 pl-2 rounded-lg"
          type="number"
          min={1}
          max={table.getPageCount()}
          value={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
        />
        <p>Page 1</p>
        <button
          className="p-1 rounded-md bg-amber-sea cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight size={18} color="white" />
        </button>
        <button
          className="p-1 rounded-md bg-amber-sea cursor-pointer"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight size={18} color="white" />
        </button>
      </div>
    </div>
  );
}
