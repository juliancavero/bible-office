import { TableFooter, TablePagination, TableRow } from "@mui/material";

type TablePaginationProps = {
  total: number | undefined;
  page: number | undefined;
  limit: number | undefined;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  rowsPerPageOptions?: number[];
};

const defaultRowsPerPageOptions = [5, 10, 25];

const PaginationTable = ({
  total,
  page,
  limit,
  setPage,
  setLimit,
  rowsPerPageOptions,
}: TablePaginationProps) => {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          count={total || 0}
          page={Number(page) - 1 || 0}
          rowsPerPage={limit || 5}
          rowsPerPageOptions={rowsPerPageOptions || defaultRowsPerPageOptions}
          onPageChange={(_, page: number) => setPage(page + 1)}
          onRowsPerPageChange={(e) => setLimit(Number(e.target.value))}
        />
      </TableRow>
    </TableFooter>
  );
};

export default PaginationTable;
