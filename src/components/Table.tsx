import { useMemo, useState } from 'react';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';

const Table = ({ data }: { data: any[] }) => {
  const columns = useMemo(
    () => [
      { Header: 'Time', accessor: 'time' },
      { Header: 'Text', accessor: 'text' },
      { Header: 'Value', accessor: 'value' },
    ],
    [],
  );

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
  );

  // Create a state
  const [filterInput, setFilterInput] = useState('');

  // Update the state when input changes
  const handleFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };
  return (
    <>
      <section className="container mx-auto px-4">
        <div className="relative mt-4 flex items-center pt-5 md:mt-0">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="mx-3 h-5 w-5 text-gray-400 dark:text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
          <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder="Search"
            className="block w-full rounded-lg border border-gray-200 bg-white py-1.5 pr-5 pl-11 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 rtl:pr-11 rtl:pl-5 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 md:w-80"
          />
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table
                  {...getTableProps()}
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps(),
                            )}
                            className="py-3.5 px-4 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                          >
                            {column.render('Header')}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? '🔽'
                                  : '🔼'
                                : ''}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    {...getTableBodyProps()}
                    className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900"
                  >
                    {rows.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="whitespace-nowrap px-4 py-4 text-sm font-medium"
                              >
                                {cell.render('Cell')}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page{' '}
            <span className="font-medium text-gray-700 dark:text-gray-100">
              1 of 10
            </span>
          </div>

          <div className="mt-4 flex items-center gap-x-4 sm:mt-0">
            <a
              href="#"
              className="flex w-1/2 items-center justify-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </a>

            <a
              href="#"
              className="flex w-1/2 items-center justify-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Table;
