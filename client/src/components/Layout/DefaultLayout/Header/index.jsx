import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Header() {
    const cx = classNames.bind(styles);
    //Tạo biến xét user id khi lấy token
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    //
    const navigate = useNavigate();

    // Tạo biến lấy token
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                navigate('/login'); // Nếu không có token, điều hướng về trang login
                return;
            }

            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (err) {
                    setError('Không thể lấy thông tin người dùng');
                }
            } else {
                setError('Bạn chưa đăng nhập');
            }
        };
        fetchUserData();
    }, [navigate]);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link className="home_page" to="/">
                    Trang chủ
                </Link>
                {
                    user && user.id ? (

                        <span>{user.username}</span>
                    ):(
                        <span>Dành cho bạn</span>

                    )
                }
                <Link className="home_page" to="/Login">
                    <span>Đăng Xuất</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
