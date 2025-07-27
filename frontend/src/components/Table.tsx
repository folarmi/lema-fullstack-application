import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import { CustomText } from "./CustomText";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { Loader } from "./Loader";
import { User } from "../utils/types";

interface TableProps {
  data: User[];
  columns: ColumnDef<User>[];
  isLoading: boolean;
  rowCount?: number;
  pagination?: PaginationState;
  setPagination?: OnChangeFn<PaginationState>;
  emptyState?: React.ReactNode;
}

const Table = ({
  data,
  columns,
  isLoading,
  rowCount,
  pagination,
  setPagination,
  emptyState,
}: TableProps) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount,
    state: {
      pagination,
    },
  });

  const navigate = useNavigate();

  // Default empty state component
  const defaultEmptyState = (
    <div className="text-center py-8 text-neutral_11">No data available</div>
  );

  return (
    <section>
      {isLoading ? (
        <div className="text-center py-4">
          <Loader />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray_200 pt-4">
            <table className="w-full  ">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left text-gray_600 font-medium text-xs px-6 whitespace-nowrap py-2"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="cursor-pointer">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          onClick={() =>
                            navigate(`/user/${row.original.id}/posts`, {
                              state: { fromPage: pagination?.pageIndex },
                            })
                          }
                          className="px-6 whitespace-nowrap border-b border-gray_200 py-7"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  // Empty state row that spans all columns
                  <tr>
                    <td colSpan={columns.length} className="py-8">
                      {emptyState || defaultEmptyState}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* {data && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                className="flex items-center cursor-pointer"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <img src={leftArrow} aria-label="Previous Page" />
                <CustomText variant="textSemiBold" className="pl-2">
                  Previous
                </CustomText>
              </button>

              <div className="flex items-center gap-1 mx-2 sm:mx-4 flex-wrap justify-center">
                <button
                  onClick={() => table.setPageIndex(0)}
                  className={clsx(
                    "px-3 py-1 rounded-lg text-sm font-medium h-10 w-10",
                    table.getState().pagination.pageIndex === 0
                      ? "bg-brand_50 text-brand_600"
                      : "text-gray_500"
                  )}
                >
                  1
                </button>

                {table.getState().pagination.pageIndex > 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {Array.from({ length: table.getPageCount() }, (_, i) => {
                  if (
                    i > 0 &&
                    i < table.getPageCount() - 1 &&
                    Math.abs(i - table.getState().pagination.pageIndex) <= 1
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => table.setPageIndex(i)}
                        className={clsx(
                          "px-3 py-1 rounded-lg text-sm font-medium h-10 w-10",
                          table.getState().pagination.pageIndex === i
                            ? "bg-brand_50 text-brand_600"
                            : "text-gray_500"
                        )}
                      >
                        {i + 1}
                      </button>
                    );
                  }
                  return null;
                })}

                {table.getState().pagination.pageIndex <
                  table.getPageCount() - 3 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {table.getPageCount() > 1 && (
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    className={clsx(
                      "px-3 py-1 rounded-lg text-sm font-medium h-10 w-10",
                      table.getState().pagination.pageIndex ===
                        table.getPageCount() - 1
                        ? "bg-brand_50 text-brand_600"
                        : "text-gray_500"
                    )}
                  >
                    {table.getPageCount()}
                  </button>
                )}
              </div>

              <button
                className="flex items-center cursor-pointer"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <CustomText variant="textSemiBold" className="pr-2">
                  Next
                </CustomText>
                <img src={rightArrow} aria-label="Next Page" />
              </button>
            </div>
          )} */}

          {data && (
            <div className="mt-6 flex items-center justify-center sm:justify-end gap-1 sm:gap-3 flex-nowrap overflow-x-hidden w-full py-1">
              <button
                className="flex items-center cursor-pointer disabled:opacity-50 whitespace-nowrap"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <img
                  src={leftArrow}
                  aria-label="Previous Page"
                  className="w-4 h-4"
                />
                <CustomText
                  variant="textSemiBold"
                  className="pl-1 sm:pl-2 text-sm"
                >
                  Previous
                </CustomText>
              </button>

              <div className="flex items-center gap-1 mx-1 sm:mx-2 flex-nowrap">
                <button
                  onClick={() => table.setPageIndex(0)}
                  className={clsx(
                    "px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium h-8 sm:h-10 w-8 sm:w-10",
                    table.getState().pagination.pageIndex === 0
                      ? "bg-brand_50 text-brand_600"
                      : "text-gray_500"
                  )}
                >
                  1
                </button>

                {table.getState().pagination.pageIndex > 2 && (
                  <span className="px-1 text-gray-500 text-xs sm:text-sm">
                    ...
                  </span>
                )}

                {Array.from({ length: table.getPageCount() }, (_, i) => {
                  if (
                    i > 0 &&
                    i < table.getPageCount() - 1 &&
                    Math.abs(i - table.getState().pagination.pageIndex) <= 1
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => table.setPageIndex(i)}
                        className={clsx(
                          "px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium h-8 sm:h-10 w-8 sm:w-10",
                          table.getState().pagination.pageIndex === i
                            ? "bg-brand_50 text-brand_600"
                            : "text-gray_500"
                        )}
                      >
                        {i + 1}
                      </button>
                    );
                  }
                  return null;
                })}

                {table.getState().pagination.pageIndex <
                  table.getPageCount() - 3 && (
                  <span className="px-1 text-gray-500 text-xs sm:text-sm">
                    ...
                  </span>
                )}

                {table.getPageCount() > 1 && (
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    className={clsx(
                      "px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium h-8 sm:h-10 w-8 sm:w-10",
                      table.getState().pagination.pageIndex ===
                        table.getPageCount() - 1
                        ? "bg-brand_50 text-brand_600"
                        : "text-gray_500"
                    )}
                  >
                    {table.getPageCount()}
                  </button>
                )}
              </div>

              <button
                className="flex items-center cursor-pointer disabled:opacity-50 whitespace-nowrap"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <CustomText
                  variant="textSemiBold"
                  className="pr-1 sm:pr-2 text-sm"
                >
                  Next
                </CustomText>
                <img
                  src={rightArrow}
                  aria-label="Next Page"
                  className="w-4 h-4"
                />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Table;
