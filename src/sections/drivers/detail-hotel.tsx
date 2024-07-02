import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import styled from 'styled-components';
import { REACT_APP_CLOUDINARY_ENDPOINT } from '../../constant';
import { Driver, Room } from '../../models';
import { convertPrice } from '../../utils';

const Image = styled.img`
width: 100%;
objectFit: cover;
height: 100%;
borderRadius:5px;
transition: transform 0.5s ease-in-out;
ZIndex:2;
&:hover{
    transform: scale(1.2);
    cursor: pointer;
},`

interface Prop {
    isOpen: boolean;
    onClose: () => void;
    hotel: Driver;
}

interface RoomListProp {
    rooms: Room[];
}

export default function DetailHotel({ isOpen, onClose, hotel }: Prop) {

    function ProfileView() {
        function ImagesList({ images }: any) {
            return (
                <ImageList cols={2} gap={5} rowHeight='auto'>
                    {images && images.map((image: any) => (
                        <ImageListItem key={image.img}>
                            <img
                                src={image}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            );
        }


        const uploadImg = async (file: any) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "stndhxae");

            return axios.post(REACT_APP_CLOUDINARY_ENDPOINT, formData).then((response) => {
                const data = response.data;
                const fileURL = data.url;
                return fileURL as string;
            });
        };

        return (
            <Box>
                <Box >
                    <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                        Chi tiết khách sạn
                    </Typography>
                </Box>
                <Container maxWidth="xl" >
                    <Box sx={{ border: "1px solid #ccc", borderRadius: "10px" }}>
                        <Box display="flex" flexDirection="row" alignItems='start' marginLeft={2} >
                            <Box flex={0.8} sx={{ mr: 2 }}>
                                <ImagesList images={hotel.images} />

                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Stack spacing={3} flex={1} sx={{ margin: 2 }}>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Tên tài xế:
                                    </Typography>
                                    <Typography sx={{ flex: 1 }}>{hotel?.hotelName}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Email liên lạc:
                                    </Typography>
                                    <Typography sx={{ flex: 1 }}>{hotel?.email}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Thành phố:
                                    </Typography>
                                    <Typography sx={{ flex: 1 }}>{hotel?.city}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Địa chỉ:
                                    </Typography>
                                    <Typography sx={{ flex: 1 }}>{hotel?.address}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Hotline:
                                    </Typography>
                                    <Typography sx={{ flex: 1 }}>{hotel?.hotline}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="start">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Dịch vụ khách sạn:
                                    </Typography>
                                    <Box flex={1}>
                                        {hotel.services.length > 0 && hotel.services.map(service => {
                                            return (
                                                <Box display="flex" flexDirection="row" alignItems="center" >
                                                    <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "20px" }} />
                                                    <Typography lineHeight={2} ml="10px">{service}</Typography>
                                                </Box>
                                            )
                                        })}
                                    </Box>

                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Cách trung tâm thành phố:
                                    </Typography>
                                    <Typography sx={{ flex: 1 }}>{hotel?.distance} km</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Mô tả chung:
                                    </Typography>
                                    <Typography sx={{ flex: 1 }}>{hotel?.description}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Đánh giá trung bình:
                                    </Typography>
                                    <Typography sx={{ flex: 1 }}>{hotel.ratingAvg === 0 ? "Chưa có đánh giá" : `${hotel.ratingAvg}`}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.6 }}>
                                        Giảm giá:
                                    </Typography>
                                    <Typography sx={{ flex: 1 }}>{hotel?.discount} %</Typography>

                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Container>
            </Box>
        );
    }

    function RoomList({ rooms }: RoomListProp) {
        return (
            <Box bgcolor="white" borderRadius="5px" pb="30px">
                <Box borderBottom="#EEE 1px solid">
                    <Typography fontWeight="600" color="#183C7D" fontSize="18px" padding="25px 0">
                        Chi tiết phòng khách sạn
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
                    {rooms.length > 0 && rooms.map(room => {
                        return (
                            <Box borderBottom="#EEE 1px solid" width="100%" p="30px 0 30px 0" display="flex" alignItems="start" justifyContent="space-between">
                                <Box flex={2} margin="0 20px" display="flex" justifyContent="center" alignItems="center" overflow="hidden" borderRadius="10px">
                                    <Image src={room.image} alt="room-image" style={{ width: "400px", objectFit: "contain" }} />
                                </Box>
                                <Box flex={3} display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" padding="0 15px" width="100%">
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" width="100%">
                                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="start" width="100%" paddingBottom="15px" borderBottom="#CCC 1px dashed">
                                            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%">
                                                <Typography color="#334E6F" fontSize="19px" fontWeight="600" flex={1}>{room.roomType}</Typography>
                                                <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" mt={1.5} flex={1}>
                                                    <Typography fontSize="14px" fontWeight="600" mr="5px">Số người tối đa:</Typography>
                                                    <Typography fontSize="14px" fontWeight="600">{room.maxPeople} người</Typography>
                                                </Box>
                                            </Box>
                                            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="100%" >
                                                <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                                                    <Typography color="#73D1B6" fontSize="19px" fontWeight="600">{convertPrice(room.price)} VND</Typography>
                                                    <Typography color="#999EA5" fontSize="14px" fontWeight="600">/Đêm</Typography>
                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent="end" alignItems="center" mt={1.5}>
                                                    <Typography color="#666" fontSize="14px" fontWeight="600" mr="10px">Số lượng phòng:</Typography>
                                                    <Box >
                                                        <Typography color="#666" fontSize="14px" fontWeight="600">{room.quantity}</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box width="100%" padding="20px 0" borderBottom="#CCC 1px dashed">
                                            <Typography color="#888" fontSize="15px">{room.description}</Typography>
                                        </Box>
                                        <Box borderBottom="#CCC 1px dashed" padding="20px 0" width="100%">
                                            <Box display="flex" justifyContent="start" alignItems="center" flexWrap="wrap" gap={2}  >
                                                <Typography color="#666" fontSize="15px" fontWeight="600"> Dịch vụ: </Typography>
                                                {room.services.map(service => {
                                                    return (
                                                        <Box display="flex" flexDirection="row" lineHeight="1.1" alignItems="center" >
                                                            <CheckOutlinedIcon sx={{ color: "#3AACEE", fontSize: "16px" }} />
                                                            <Typography fontSize="14px" color="#8894B5" ml="10px">{service}</Typography>
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        )

    }

    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={isOpen}
        >
            <DialogTitle>Thông tin chi tiết khách sạn</DialogTitle>
            <DialogContent>
                <ProfileView />
                <RoomList rooms={hotel.rooms} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' size='large'>Đóng</Button>
            </DialogActions>
        </Dialog>
    )
}