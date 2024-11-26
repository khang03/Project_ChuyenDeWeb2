import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
const bcrypt = require('bcryptjs'); // Thư viện để mã hóa mật khẩu

const cx = classNames.bind(style);

function Login() {
    // State để lưu trữ các giá trị người dùng nhập vào
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngừng reload trang khi submit

        // Bật trạng thái loading khi gửi yêu cầu
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password,
            });

            // Lấy token và thông tin người dùng từ response
            const { token, userId, username: loggedUsername } = response.data;

            // Lưu token vào localStorage hoặc cookie nếu cần thiết
            localStorage.setItem('authToken', token);

            // Hiển thị thông báo thành công
            setMessage(`Đăng nhập thành công, chào ${loggedUsername}!`);

            // Reset form sau khi đăng nhập thành công
            setUsername('');
            setPassword('');
            // Sau khi đăng nhập thành công, chuyển hướng đến trang chủ hoặc trang cá nhân
            navigate('/profile');
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            setMessage(error.response?.data?.message || 'Lỗi hệ thống');
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography className={cx('title_login')} variant="h5">
                        Đăng Nhập
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Nhập tài khoản"
                            value={username}
                            id="username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Mật Khẩu"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Đăng Nhập
                        </Button>
{/* Annguyen: Thêm link quên mật khẩu */}
                        <div className="justify-between flex">
                            <Link className={cx('register') + ' justify-start flex'} to="/Register">
                                Đăng ký
                            </Link>
                            {/* Annguyen: Quên mật khẩu */}
                            <Link className={cx('register') + ' text-blue-400 justify-end flex'} to="/ResetPassword">
                                Quên mật khẩu
                            </Link>
                        </div>
                    </form>
                    {message}
                </Paper>
            </Container>
        </div>
    );
}

export default Login;
