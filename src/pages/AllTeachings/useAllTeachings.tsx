import useDeleteTeaching from "@/api/Teachings/useDeleteTeaching";
import useGetTeachings from "@/api/Teachings/useGetTeachings";
import useNav from "@/hooks/useNav";
import useRequestParams from "@/hooks/useRequestParams";
import { useState } from "react";

const useAllTeachings = () => {
  const { navigate, refresh } = useNav();
  const { state, setOrder, setOrderBy, setPage, setSearch, setLimit } =
    useRequestParams();

  const { mutate: deleteTeaching } = useDeleteTeaching();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [teachingId, setTeachingId] = useState<number | null>(null);

  const [book, setBook] = useState<string | undefined>(undefined);
  const [chapter, setChapter] = useState<string | undefined>(undefined);

  const { data } = useGetTeachings({
    ...state,
    ...(book && { book }),
    ...(chapter && { chapter }),
  });

  const handleSorting = (property: string) => {
    setOrderBy(property);
    const isAsc = state.order === "asc";

    if (isAsc && state.order_by === property) {
      return setOrder("desc");
    } else if (isAsc) {
      return setOrderBy(property);
    }

    return setOrder("asc");
  };

  const handleSearch = (search: string) => {
    setSearch(search);
    setPage(1);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setTeachingId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setTeachingId(null);
  };

  const onEdit = (teachingId: number) => {
    navigate(`/teachings/${teachingId}`);
  };

  const onEditMenu = () => {
    navigate(`/teachings/${teachingId}`);
    handleCloseMenu();
  };

  const onDeleteMenu = () => {
    teachingId &&
      deleteTeaching(teachingId, {
        onSuccess: () => {
          refresh();
        },
      });
    handleCloseMenu();
  };

  const onClearFilters = () => {
    setBook(undefined);
    setChapter(undefined);
    setSearch("");
  };

  return {
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
  };
};

export default useAllTeachings;
