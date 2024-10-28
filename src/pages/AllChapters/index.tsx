import MainPaper from "@/components/Containers/MainPaper";
import { Select } from "@/components/Inputs/Select";
import PaginationTable from "@/components/Table/TablePagination";
import Row from "@/components/Table/TableRow";
import { BibleBooks } from "@/lib/BibleBooks";
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
import useAllChapters from "./useAllChapters";

const AllChaptersPage = () => {
  const {
    data,
    state,
    handleSorting,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
    onEditMenu,
    onDeleteMenu,
    onEdit,
    setPage,
    setLimit,
    onClearFilters,
    handleSearch,
    book,
    setBook,
  } = useAllChapters();
  return (
    <MainPaper>
      <Typography variant="h3" marginBottom={3}>
        Todos los Capítulos
      </Typography>

      <Grid
        container
        justifyContent="flex-end"
        alignItems={"center"}
        spacing={3}
      >
        <Grid item xs={5}>
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
            value={state.search}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            includeEmpty
            options={BibleBooks}
            onChange={(e) => setBook(e.target.value)}
            value={book}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={onClearFilters}>
            <Clear />
          </IconButton>
        </Grid>
      </Grid>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSorting("book")}>
              <FlexCell>
                <Typography variant="h6">Libro</Typography>
                <ArrowIcon
                  isAsc={state.order === "asc"}
                  shouldRender={state.order_by === "book"}
                />
              </FlexCell>
            </TableCell>
            <TableCell onClick={() => handleSorting("chapter")}>
              <FlexCell>
                <Typography variant="h6">Capítulo</Typography>
                <ArrowIcon
                  isAsc={state.order === "asc"}
                  shouldRender={state.order_by === "chapter"}
                />
              </FlexCell>
            </TableCell>
            <TableCell padding="checkbox">
              <FlexCell>
                <Typography variant="h6">Acciones</Typography>
              </FlexCell>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((chapter) => (
            <Row key={chapter.id}>
              <TableCell onClick={() => onEdit(chapter.id)}>
                {chapter.book}
              </TableCell>
              <TableCell onClick={() => onEdit(chapter.id)}>
                {chapter.chapter}
              </TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleOpenMenu(e, chapter.id)}>
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

export default AllChaptersPage;

const FlexCell = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
