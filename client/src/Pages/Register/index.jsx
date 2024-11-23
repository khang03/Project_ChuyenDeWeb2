import React, { Fragment, useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import style from './Register.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import axios from 'axios';
const bcrypt = require('bcryptjs'); // Thư viện để mã hóa mật khẩu

const cx = classNames.bind(style);
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState();

    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Xử lý đăng ký ở đây
    //     if (password !== confirmPassword) {
    //         alert('Mật khẩu không khớp!');
    //         return;
    //     }
    //     console.log('Email:', username);
    //     console.log('Password:', password);
    // };

    // // Hàm để xử lý form submit
    // const handlePreviewAvatar = (e) => {
    //     const file = e.target.files[0];
    //     file.preview = URL.createObjectURL(file);
    //     setAvatar(file);
    //     console.log(file.preview);
    // };
    const handleSubmitUser = async (e) => {
        e.preventDefault(); // Ngừng reload trang khi submit form

        // Cập nhật trạng thái loading khi gửi yêu cầu
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/users/store', {
                username: username,
                password: password,
                email: email,
                bio: bio,
                name: name,
                avatar: avatar,
            });
            setMessage(response.data.message); // Lấy thông báo từ server

            // Reset form sau khi thành công
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đăng ký:', error);
            setMessage(error.response?.data?.message || 'Lỗi hệ thống');
        } finally {
            setLoading(false); // Tắt loading khi yêu cầu hoàn tất
        }
    };
    return (
        <div className={cx('wrapper')}>
            
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5">Đăng Ký</Typography>
                    <form onSubmit={handleSubmitUser}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Link hình ảnh"
                            type="text"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />{' '}
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Xác Nhận Mật Khẩu"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Đăng Ký
                        </Button>
                        <Link className={cx('register')} to="/Login">
                            Đăng nhập
                        </Link>
                    </form>
                    <>{message}</>
                </Paper>
            </Container>
        </div>
    );
}

export default Register;
