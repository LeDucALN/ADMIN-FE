import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Logo from '../../components/logo';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility'

import { useNavigate } from 'react-router-dom';
import { bgGradient } from '../../theme/css';
import axiosInstance from '../../api/axios';


// ----------------------------------------------------------------------

export default function SigninView() {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')

    const [errAccount, setErrAccount] = useState(false)
    const [errPassword, setErrPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>();

    const theme = useTheme();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleChangeEmail = (e: any) => {
        setAccount(e.target.value)
        if (e.target.value) {
            setErrAccount(false)
        }
    }
    const handleChangePassword = (e: any) => {
        setPassword(e.target.value)
        if (e.target.value) {
            setErrPassword(false)
        }
    }

    const handleSignin = async (e: any) => {
        e.preventDefault()
        if (!account || !password) {
            !account ? setErrAccount(true) : setErrAccount(false)
            !password ? setErrPassword(true) : setErrPassword(false)
            return;
        }
        const signin= async () => {
            setLoading(true)
            try {
                const res = await axiosInstance.post('/auth/admin/signin', {
                    account,
                    password
                })
                if (res.status === 200) {
                    localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken))
                    navigate('/')
                }
            } catch (error) {
                setError(error)
            }
        }
        signin()
    }
    const renderForm = (
        <Box component="form" noValidate onSubmit={handleSignin}>
            <Stack spacing={3} mb={5}>
                <TextField
                    name="Tài khoản"
                    label="Tài khoản"
                    value={account}
                    onChange={handleChangeEmail}
                    // autoComplete="email"
                    autoFocus
                    error={errAccount}
                />
                <TextField
                    name="Mật khẩu"
                    label="Mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChangePassword}
                    error={errPassword}
                    autoComplete='current-password'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <Box display="flex" justifyContent='center' alignItems='center'>
                <Button variant="contained" sx={{ textTransform: "uppercase" }} size='large' type="submit">Đăng nhập</Button>
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                height: 1, bgcolor: "#13366E"
            }}
        >
            <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/08/logo.png" alt="logo"
                style={{
                    height: "35px", width: "133px", cursor: "pointer", position: 'fixed',
                    top: "50px",
                    left: "40px",
                }} onClick={() => navigate("/")} />
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 500,
                    }}
                >
                    <Box display="flex" justifyContent='center' alignItems='center'>
                        <Typography variant="h4" textTransform="uppercase" mb="30px">Đăng nhập</Typography>
                    </Box>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
