import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Customer from './components/Customer/Customer';
import Footer from './components/Footer/Footer';
import NavSideBar from './components/NavSideBar/NavSideBar';

//
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CustomerForm from './components/Customer/CustomerForm';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const mdTheme = createTheme();
function App() {
  const [open, setOpen] = React.useState(true);


  const handleOnClick = (value: boolean) => {
    setOpen(value);
  }
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <NavSideBar handleOnClick={handleOnClick} stateOpen={open} />

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
            style={{}}
          >
            <Toolbar />

            <Box style={{ height: '80vh' }}>
              <BrowserRouter>
                <Routes >
                  <Route path='/customer' element={<Customer />} />
                  <Route path='/customer/create' element={<CustomerForm />} />
                </Routes>
              </BrowserRouter>
            </Box>

            <Box style={{ height: '6vh', position: 'fixed', bottom: '0', width: '100%' }}>
              <Footer />
            </Box>

          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;