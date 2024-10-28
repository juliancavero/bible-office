import MainPaper from "@/components/Containers/MainPaper";
import PaginationTable from "@/components/Table/TablePagination";
import Row from "@/components/Table/TableRow";
import {
  ArrowDownward,
  ArrowUpward,
  Clear,
  MoreVert,
} from "@mui/icons-material";
import {
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
import useAllTeachings from "./useAllTeachings";

const AllTeachingsPage = () => {
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
    onClearFilters,
    setPage,
    setLimit,
  } = useAllTeachings();
  return (
    <MainPaper>
      <Typography variant="h3" marginBottom={3}>
        Todas las Enseñanzas
      </Typography>

      <Grid
        container
        justifyContent="flex-end"
        alignItems={"center"}
        spacing={3}
      >
        {/* <Grid item>
      <FormControlLabel
        control={
          <Checkbox
            value={withoutImage}
            onChange={(_, checked) => setWithoutImage(checked)}
          />
        }
        label="Sin imagen"
      />
    </Grid> */}
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
                <Typography variant="h6">Libro</Typography>
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
                <Typography variant="h6">Capítulo</Typography>
                <ArrowIcon
                  isAsc={state.order === "asc"}
                  shouldRender={state.order_by === "month"}
                />
              </FlexCell>
            </TableCell>
            <TableCell onClick={() => handleSorting("name")}>
              <FlexCell>
                <Typography variant="h6">Id</Typography>
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
          {data?.data.map((teaching) => (
            <Row key={teaching.id}>
              <TableCell onClick={() => onEdit(teaching.id)}>
                {teaching.book}
              </TableCell>
              <TableCell onClick={() => onEdit(teaching.id)}>
                {teaching.chapter}
              </TableCell>
              <TableCell onClick={() => onEdit(teaching.id)}>
                {teaching.id}
              </TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleOpenMenu(e, teaching.id)}>
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

export default AllTeachingsPage;

type ArrowIconProps = {
  isAsc: boolean;
  shouldRender: boolean;
};

const ArrowIcon = ({ isAsc, shouldRender }: ArrowIconProps) => {
  if (!shouldRender) return null;

  return isAsc ? <ArrowUpward /> : <ArrowDownward />;
};

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
