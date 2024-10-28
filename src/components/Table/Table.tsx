import { styled, Table } from "@mui/material";

const StyledTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default StyledTable;
