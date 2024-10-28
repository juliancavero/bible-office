import { Paper, styled } from "@mui/material";

const MainPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "noPadding",
})<{ noPadding?: boolean }>(({ theme, noPadding = false }) => ({
  padding: !noPadding ? theme.spacing(2) : theme.spacing(0),
  display: "flex",
  flexDirection: "column",
  width: "100%",
  boxSizing: "border-box",
}));

export default MainPaper;
