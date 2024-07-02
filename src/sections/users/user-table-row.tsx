import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { UserForm } from '../../models';
import DetailForm from './detail-form';

interface Prop {
    userForm: UserForm;
}


export default function UserTableRow({
    userForm
}: Prop) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow hover tabIndex={-1} >
                <TableCell >
                    <Stack direction="row" alignItems="center" spacing={2} >
                        <Avatar alt={userForm.username} src={userForm.username} />
                        <Typography variant="subtitle2" noWrap>
                            {userForm.username}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell align="center">
                    {userForm.email}
                </TableCell>
                <TableCell align="center">
                    {userForm.phoneNumber}
                </TableCell>
                <TableCell align="center">
                    {userForm.city}
                </TableCell>
                <TableCell align="center">
                    {userForm.forms.length}
                </TableCell>
                <TableCell align="center">
                    <VisibilityIcon color='success' onClick={() => setOpen(true)} />
                </TableCell>
            </TableRow>
            <DetailForm isOpen={open} onClose={() => setOpen(false)} userForm={userForm} />
        </>
    );
}
