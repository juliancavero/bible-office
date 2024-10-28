import useIsMobile from "@/hooks/useIsMobile";
import {
  Home,
  ImportContactsOutlined,
  Menu,
  PersonOutline,
  StarOutline,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const LeftMenuLinks = [
  {
    name: "Inicio",
    icon: (
      <>
        <Home />
      </>
    ),
    link: "/",
  },
  {
    name: "Todos los Capítulos",
    icon: (
      <>
        <ImportContactsOutlined />
      </>
    ),
    link: "/chapters",
  },
  {
    name: "Crear Capítulo",
    icon: (
      <>
        <ImportContactsOutlined />+
      </>
    ),
    link: "/create-chapter",
  },
  {
    name: "Todos los Santos",
    icon: <PersonOutline />,
    link: "/saints",
  },
  {
    name: "Crear Santo",
    icon: (
      <>
        <PersonOutline />+
      </>
    ),
    link: "/create-saint",
  },
  {
    name: "Todas las Enseñanzas",
    icon: (
      <>
        <StarOutline />
      </>
    ),
    link: "/teachings",
  },
  {
    name: "Crear Enseñanza",
    icon: (
      <>
        <StarOutline />+
      </>
    ),
    link: "/create-teaching",
  },
];

const MainSkeleton = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(isMobile ? false : true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goTo = (link: string) => {
    navigate(link);
    isMobile && handleDrawerClose();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MuiAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Back Office
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <Menu />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {LeftMenuLinks.map((text, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => goTo(text.link)}
            >
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainSkeleton;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  //padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const MuiAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
