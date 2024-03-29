import React from "react";
import { Routes, Route } from "react-router-dom";
import Customer from "./components/Customer/Customer";
import Footer from "./components/Footer/Footer";
import NavSideBar from "./components/NavSideBar/NavSideBar";

//
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CustomerForm from "./components/Customer/CustomerForm";
import CustomerUpdateForm from "./components/Customer/CustomerUpdateForm";
import Equipment from "./components/Equipment/Equipment";
import EquipmentForm from "./components/Equipment/EquipmentForm";
import EquipmentUpdateForm from "./components/Equipment/EquipmentUpdateForm";
import Chemical from "./components/Chemical/Chemical";
import ChemicalForm from "./components/Chemical/ChemicalForm";
import ChemicalUpdateForm from "./components/Chemical/ChemicalUpdateForm";
import Staff from "./components/Staff/Staff";
import StaffForm from "./components/Staff/StaffForm";
import StaffUpdateForm from "./components/Staff/StaffUpdateForm";
import System from "./components/System/System";
import Lab from "./components/System/Lab/Lab";
import LabForm from "./components/System/Lab/LabForm";
import LabUpdateForm from "./components/System/Lab/LabUpdateForm";
import Method from "./components/System/Method/Method";
import MethodForm from "./components/System/Method/MethodForm";
import MethodUpdateForm from "./components/System/Method/MethodUpdateForm";
import MethodDetail from "./components/System/Method/MethodDetail";
import LabDetail from "./components/System/Lab/LabDetail";
import Login from "./components/Login/Login";
import Sample from "./components/Sample/Sample";
import SampleForm from "./components/Sample/SampleForm";
import SampleUpdateForm from "./components/Sample/SampleUpdateForm";
import SampleDetail from "./components/Sample/SampleDetail";
import PrivateRoute from "./components/Login/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Task from "./components/Task/Task";
import TaskForm from "./components/Task/TaskForm";
import TaskFormAdmin from "./components/Task/TaskFormAdmin";
import TaskEditAdmin from "./components/Task/TaskEditAdmin";
const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
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
  };

  const AppComponent = () => {
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
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
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
            style={{}}
          >
            <Toolbar />

            <Box style={{ height: "80vh" }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/customer/create" element={<CustomerForm />} />
                <Route
                  path="/customer/:customerId"
                  element={<CustomerUpdateForm />}
                />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/equipment/create" element={<EquipmentForm />} />
                <Route
                  path="/equipment/:equipmentId"
                  element={<EquipmentUpdateForm />}
                />
                <Route path="/chemical" element={<Chemical />} />
                <Route path="/chemical/create" element={<ChemicalForm />} />
                <Route
                  path="/chemical/:chemicalId"
                  element={<ChemicalUpdateForm />}
                />

                <Route path="/staff" element={<Staff />} />
                <Route path="/staff/create" element={<StaffForm />} />
                <Route path="/staff/:staffId" element={<StaffUpdateForm />} />

                <Route path="/system" element={<System />} />

                <Route path="/lab" element={<Lab />} />
                <Route path="/lab/create" element={<LabForm />} />
                <Route path="/lab/:labId" element={<LabUpdateForm />} />
                <Route path="/labDetail/:labId" element={<LabDetail />} />
                <Route path="/method" element={<Method />} />
                <Route path="/method/create" element={<MethodForm />} />
                <Route
                  path="/method/:methodId"
                  element={<MethodUpdateForm />}
                />
                <Route
                  path="/method/detail/:methodId"
                  element={<MethodDetail />}
                />
                <Route path="/sample" element={<Sample />} />
                <Route path="/sample/create/:id" element={<SampleForm />} />
                <Route
                  path="/sample/:sampleId"
                  element={<SampleUpdateForm />}
                />
                <Route
                  path="/sample/detail/:sampleId"
                  element={<SampleDetail />}
                />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/task" element={<Task />} />
                <Route path="/task/:taskId" element={<TaskForm />} />
                <Route path="/task/admin/:taskId" element={<TaskFormAdmin />} />
                <Route path="/task/staff/:taskId" element={<TaskEditAdmin />} />
              </Routes>
            </Box>

            <Box
              style={{
                height: "6vh",
                position: "fixed",
                bottom: "0",
                width: "100%",
              }}
            >
              <Footer />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<AppComponent />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
