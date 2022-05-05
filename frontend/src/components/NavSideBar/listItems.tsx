import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

//icons
import ListItemIcon from '@mui/material/ListItemIcon';
import LayersIcon from '@mui/icons-material/Layers';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import HardwareIcon from '@mui/icons-material/Hardware';
import ScienceIcon from '@mui/icons-material/Science';
import DnsIcon from '@mui/icons-material/Dns';
import BiotechIcon from '@mui/icons-material/Biotech';
import GroupsIcon from '@mui/icons-material/Groups';

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Trang Chủ" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Khách Hàng" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ScienceIcon />
      </ListItemIcon>
      <ListItemText primary="Mẫu" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Công Việc" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Thiết Bị" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <HardwareIcon />
      </ListItemIcon>
      <ListItemText primary="Vật Tư" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Nhân Sự" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BiotechIcon />
      </ListItemIcon>
      <ListItemText primary="Phòng Lab" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Kết Quả" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <DnsIcon />
      </ListItemIcon>
      <ListItemText primary="Hệ Thống" />
    </ListItemButton>
  </>
);
