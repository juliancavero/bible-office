import useDeleteChapter from "@/api/Chapters/useDeleteChapter";
import useGetChapters from "@/api/Chapters/useGetChapters";
import useNav from "@/hooks/useNav";
import useRequestParams from "@/hooks/useRequestParams";
import { useState } from "react";

const useAllChapters = () => {
  const { state, setOrder, setOrderBy, setPage, setSearch, setLimit } =
    useRequestParams();
  const { mutateAsync: deleteChapter } = useDeleteChapter();
  const { navigate, refresh } = useNav();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [book, setBook] = useState<string | undefined>(undefined);

  const { data } = useGetChapters({
    ...state,
    book,
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
    setChapterId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setChapterId(null);
  };

  const onEdit = (chapterId: number) => {
    navigate(`/chapters/${chapterId}`);
  };

  const onEditMenu = () => {
    navigate(`/chapters/${chapterId}`);
    handleCloseMenu();
  };

  const onDeleteMenu = () => {
    chapterId &&
      deleteChapter(chapterId, {
        onSuccess: () => {
          refresh();
        },
      });
    handleCloseMenu();
  };

  const onClearFilters = () => {
    setSearch("");
    setBook("");
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
    setPage,
    setLimit,
    onClearFilters,
    book,
    setBook,
  };
};

export default useAllChapters;
