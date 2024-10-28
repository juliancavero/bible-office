import MainPaper from "@/components/Containers/MainPaper";
import { Select } from "@/components/Inputs/Select";
import PaginationTable from "@/components/Table/TablePagination";
import Row from "@/components/Table/TableRow";
import { days, months } from "@/utils/calendar";
import {
  ArrowDownward,
  ArrowUpward,
  Clear,
  MoreVert,
} from "@mui/icons-material";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import useAllSaints from "./useAllSaints";

const AllSaintsPage = () => {
  const {
    data,
    state,
    handleSearch,
    handleSorting,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
    onEditMenu,
    onDeleteMenu,
    onEdit,
    day,
    month,
    setDay,
    setMonth,
    onClearFilters,
    setPage,
    setLimit,
    setWithoutImage,
    withoutImage,
  } = useAllSaints();
  return (
    <MainPaper>
      <Typography variant="h3" marginBottom={3}>
        Todos los Santos
      </Typography>

      <Grid
        container
        justifyContent="flex-end"
        alignItems={"center"}
        spacing={3}
      >
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                value={withoutImage}
                onChange={(_, checked) => setWithoutImage(checked)}
              />
            }
            label="Sin imagen"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
            value={state.search}
          />
        </Grid>
        <Grid item>
          <Select
            includeEmpty
            options={days}
            onChange={(e) => setDay(e.target.value)}
            value={day}
          />
        </Grid>
        <Grid item>
          <Select
            includeEmpty
            options={months}
            onChange={(e) => setMonth(e.target.value)}
            value={month}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={onClearFilters}>
            <Clear />
          </IconButton>
        </Grid>
      </Grid>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" onClick={() => handleSorting("day")}>
              <FlexCell>
                <Typography variant="h6">Día</Typography>
                <ArrowIcon
                  isAsc={state.order === "asc"}
                  shouldRender={state.order_by === "day"}
                />
              </FlexCell>
            </TableCell>
            <TableCell
              padding="checkbox"
              onClick={() => handleSorting("month")}
            >
              <FlexCell>
                <Typography variant="h6">Mes</Typography>
                <ArrowIcon
                  isAsc={state.order === "asc"}
                  shouldRender={state.order_by === "month"}
                />
              </FlexCell>
            </TableCell>
            <TableCell onClick={() => handleSorting("name")}>
              <FlexCell>
                <Typography variant="h6">Nombre</Typography>
                <ArrowIcon
                  isAsc={state.order === "asc"}
                  shouldRender={state.order_by === "name"}
                />
              </FlexCell>
            </TableCell>
            <TableCell padding="checkbox" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((saint) => (
            <Row key={saint.id}>
              <TableCell onClick={() => onEdit(saint.id)}>
                {saint.day}
              </TableCell>
              <TableCell onClick={() => onEdit(saint.id)}>
                {saint.month}
              </TableCell>
              <TableCell onClick={() => onEdit(saint.id)}>
                {saint.name}
              </TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleOpenMenu(e, saint.id)}>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </Row>
          ))}
        </TableBody>
        <PaginationTable
          total={data?.meta.total}
          page={data?.meta.page}
          limit={data?.meta.limit}
          setPage={setPage}
          setLimit={setLimit}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={onEditMenu}>Editar</MenuItem>
          <MenuItem onClick={onDeleteMenu}>Eliminar</MenuItem>
        </Menu>
      </Table>
    </MainPaper>
  );
};

type ArrowIconProps = {
  isAsc: boolean;
  shouldRender: boolean;
};

const ArrowIcon = ({ isAsc, shouldRender }: ArrowIconProps) => {
  if (!shouldRender) return null;

  return isAsc ? <ArrowUpward /> : <ArrowDownward />;
};

export default AllSaintsPage;

/* const StyledBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
 */

const FlexCell = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
