import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Driver, Status } from '../../models';
import DetailHotel from './detail-hotel';

interface Prop {
    driver: Driver;
    handleChangeDriver: (driver: Driver) => void;
}


export default function DriverTableRow({
    driver,
    handleChangeDriver
}: Prop) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const handleChangeAction = (event: any) => {
        handleChangeDriver({ ...driver, status: event.target.value });
    };
    const getBackgroundColor = (status: Status) => {
        switch (status) {
            case 'pending':
                return 'FFEB3B';
            case 'active':
                return '#4CAF50';
            case 'block':
                return '#F44336';
            default:
                return 'orange';
        }
    };

    const convertStatus = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Chờ xác nhận';
            case 'active':
                return 'Đang hoạt động';
            case 'block':
                return 'Đã chặn';
            default:
                return 'Chờ xác nhận';
        }
    }
    return (
        <>
            <TableRow hover tabIndex={-1} >
                <TableCell>
                    <Stack
                        display="flex"
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ overflow: "hidden", width: "250px" }}
                    >
                        <Avatar alt={driver.username} src={driver.username} />
                        <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {driver.username}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell align="center">
                    {driver.email}
                </TableCell>

                <TableCell align="center">
                    {driver.telephone}
                </TableCell>

                <TableCell align="center">
                    {driver.address}
                </TableCell>

                <TableCell align="center">
                    {driver.ratingAvg ? driver.ratingAvg : 'Chưa có đánh giá'}
                </TableCell>

                <TableCell align="center" >
                    <VisibilityIcon color='success' onClick={() => setOpen(true)} />
                </TableCell>

                <TableCell align="center">
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={driver.status}
                            hiddenLabel
                            displayEmpty
                            onChange={handleChangeAction}
                            sx={{
                                backgroundColor: getBackgroundColor(driver.status),
                                '&.Mui-disabled': {
                                    cursor: 'not-allowed',
                                    color: "white",
                                },
                            }}
                            renderValue={(value) => convertStatus(value)}
                        >
                            <MenuItem value="pending"><em>Chờ xác nhận</em></MenuItem>
                            <MenuItem value='active'>Chấp nhận</MenuItem>
                            <MenuItem value='block'>Từ chối</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
            </TableRow>
            <DetailHotel isOpen={open} onClose={() => setOpen(false)} hotel={driver}/>
        </>
    );
}
