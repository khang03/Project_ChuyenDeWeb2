import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const cx = classNames.bind(style);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý đăng nhập ở đây
        console.log('Email:', email);
        console.log('Password:', password);
    };
        return (
            <div className={cx('wrapper')}>
                <Container component="main" maxWidth="xs">
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography className={cx('title_login')} variant="h5">Đăng Nhập</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Nhập tài khoản"
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
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Đăng Nhập
                            </Button>
                            <Link className={cx('register')} to='/Register' >Đăng ký</Link>
                        </form>
                    </Paper>
                </Container>
            </div>
        );
    
}

export default Login;
