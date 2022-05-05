import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './listItems';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';



const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const NavSideBar = ({ handleOnClick, stateOpen }: any) => {
    const toggleDrawer = () => {
        handleOnClick(!stateOpen);
    };

    return (
        <Drawer variant="permanent" open={stateOpen}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                    {/* src will be fetched */}
                    <Avatar src='' alt='avatar' sx={{width: '50px', height: '50px', backgroundColor: 'grey', marginRight: '10px' }}/>

                    <div style={{ flexGrow: '1' }}>
                        <div style={{ fontSize: '15px', fontWeight: '600' }}>Người Dùng</div>

                        <div style={{ fontSize: '12px' }}>Trưởng Nhóm</div>

                    </div>
                </Box>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {mainListItems}
            </List>
        </Drawer>
    )
}

export default NavSideBar