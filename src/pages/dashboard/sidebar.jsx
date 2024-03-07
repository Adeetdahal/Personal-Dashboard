import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import DashboardLogo from "../../assets/Dashboard_logo.png";
import NewsHome from "../news/components/NewsHome";
import { Link } from "react-router-dom";
import { useGetNewsData } from "../news/handlers/getNewsData";
import Skeleton from "../news/components/Skeleton";
import WeatherWidget from '../weather/WeatherWidget';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { data, isLoading } = useGetNewsData();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <div className="flex w-100 h-100 justify-center items-center py-2">
        <img
          src={DashboardLogo}
          alt="Dashboard Logo"
          width={100}
          height={100}
        />
      </div>
      <Divider />
      <List>
        {["Dashboard", "My Task", "Weather", "News"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton href={text}>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <DashboardIcon /> : <MailIcon />} */}
                {text === "Dashboard" ? (
                  <DashboardIcon />
                ) : text === "Task" ? (
                  <ListAltIcon />
                ) : text === "Weather" ? (
                  <WbSunnyIcon />
                ) : text === "News" ? (
                  <NewspaperIcon />
                ) : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <p></p>Dashboard
            <p className="text-sm"> Here's your overview</p>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        // component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className="overflow-y-hidden"
      >

        {/* <div className="flex justify-start w-[80%] overflow-hidden">
            <NewsHome/>
        </div> */}
        <div className="flex flex-col w-fit py-10 overflow-y-hidden">
          <header>
            <h1 className="text-2xl font-bold">Top Headlines</h1>
          </header>
          <span className="flex gap-6 py-4 flex-wrap justify-center w-full">
            {isLoading && <Skeleton />}
            {data?.articles
              ?.slice(1, 7)
              .map(({ description, title, url, urlToImage }) => {
                return (
                  <div
                    className="flex flex-col h-max gap-2 p-4 rounded-lg max-w-sm shadow-xl ring-1 ring-gray-900/5"
                    key={title}
                  >
                    <span className="text-xl font-bold">{title}</span>
                    {urlToImage && <img src={urlToImage} alt={title} />}
                    <p>{description}</p>
                    <Link to={url} className="flex justify-end">
                      <button className="bg-indigo-500 py-2 px-3 text-white rounded-xl">
                        Read More
                      </button>
                    </Link>
                  </div>
                );
              })}
          </span>
        </div>

        {/* Weather section */}
        <div id="Weather">
        <WeatherWidget />
        </div>

      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
