import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <AutoGraphOutlinedIcon />,
  },
  {
    title: 'Quản lý tài xế',
    path: '/drivers',
    icon: <MeetingRoomIcon />,
  },
  {
    title: 'Quản lý người dùng ',
    path: '/users',
    icon: <ContactEmergencyIcon />,
  },
  
];

export default navConfig;
