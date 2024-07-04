import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import DriverTableToolbar from './driver-table-toolbar';
import Scrollbar from '../../components/scrollbar';
import { emptyRows, applyFilter, getComparator } from './utils';
import DriverTableRow from './driver-table-row';
import TableEmptyRows from './table-empty-rows';
import TableNoData from './table-no-data';
import DriverTableHead from './driver-table-head';
import { Driver } from '../../models';
import { AlignHorizontalCenter } from '@mui/icons-material';
import axiosInstance from '../../api/axios';

// ----------------------------------------------------------------------

export default function DriverPage() {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('username');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [drivers, setDrivers] = useState<Driver[]>([])

    const handleSort = (event: any, id: any) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    useEffect(() => {
        const fetchAllDriver = async() => {
            const listDriver = await axiosInstance.get('/driver/getAllDriverByAdmin')
            setDrivers(listDriver.data);
        }
        fetchAllDriver();
    }, [])

    const handleChangeDriver = (driver: Driver) => {
        setDrivers(drivers.map((item) => (item._id === driver._id ? driver : item)));
    }


    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event: any) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: drivers,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container maxWidth='xl'>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Quản lý tài xế</Typography>
            </Stack>

            <Card>
                <DriverTableToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <DriverTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleSort}
                                headLabel={[
                                    { id: 'username', label: 'Tên tài xế' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'phone', label: 'Số điện thoại' },
                                    { id: 'city', label: 'Địa chỉ', },
                                    { id: 'ratingAvg', label: 'Đánh giá trung bình' },
                                    { id: 'actions', label: 'Hành động' },
                                    { id: 'status', label: 'Trạng thái' }
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((driver: Driver) => (
                                        <DriverTableRow
                                            key={driver._id}
                                            driver={driver}
                                            handleChangeDriver={handleChangeDriver}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, drivers.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={drivers.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Số hàng trên trang"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} trong ${count}`
                      }
                />
            </Card>
        </Container>
    );
}
