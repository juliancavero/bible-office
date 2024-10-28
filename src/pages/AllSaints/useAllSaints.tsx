import useDeleteSaint from "@/api/Saints/useDeleteSaint";
import useGetSaints from "@/api/Saints/useGetSaints";
import useNav from "@/hooks/useNav";
import useRequestParams from "@/hooks/useRequestParams";
import { useState } from "react";

const useAllSaints = () => {
  const { navigate, refresh } = useNav();
  const { state, setOrder, setOrderBy, setPage, setSearch, setLimit } =
    useRequestParams();

  const { mutate: deleteSaint } = useDeleteSaint();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [saintId, setSaintId] = useState<number | null>(null);
  const [day, setDay] = useState<string | undefined>(undefined);
  const [month, setMonth] = useState<string | undefined>(undefined);
  const [withoutImage, setWithoutImage] = useState<boolean>(false);

  const { data } = useGetSaints({
    ...state,
    ...(day && { day }),
    ...(month && { month }),
    ...(withoutImage && { withoutImage }),
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
    setSaintId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSaintId(null);
  };

  const onEdit = (saintId: number) => {
    navigate(`/saints/${saintId}`);
  };

  const onEditMenu = () => {
    navigate(`/saints/${saintId}`);
    handleCloseMenu();
  };

  const onDeleteMenu = () => {
    saintId &&
      deleteSaint(saintId, {
        onSuccess: () => {
          refresh();
        },
      });
    handleCloseMenu();
  };

  const onClearFilters = () => {
    setDay("");
    setMonth("");
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
    day,
    month,
    setDay,
    setMonth,
    onClearFilters,
    setPage,
    setLimit,
    withoutImage,
    setWithoutImage,
  };
};

export default useAllSaints;
