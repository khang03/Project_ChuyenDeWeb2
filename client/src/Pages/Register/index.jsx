import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import style from './Register.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý đăng ký ở đây
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className={cx('wrapper')}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5">Đăng Ký</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <Link className={cx('register')} to='/Login' >Đăng nhập</Link>

                    </form>
                </Paper>
            </Container>    
        </div>
    );
}

export default Register;
