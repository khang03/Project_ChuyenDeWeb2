import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import {
    BiHeart,
    BiSearch,
    BiHomeAlt2,
    BiUser,
    BiSolidHeart,
    BiSolidSearch,
    BiSolidUser,
    BiChat,
    BiSolidChat,
    BiSolidHomeAlt2,
} from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { Button, Menu, MenuItem, Fade } from '@mui/material';
import { IoSettingsOutline } from "react-icons/io5";
import axios from 'axios';


const cx = classNames.bind(styles);
function Sidebar() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isFindPage = location.pathname === '/Find';
    const isNotiPage = location.pathname === '/Notification';
    const isProfile = location.pathname === '/Profile';
    const isChat = location.pathname === '/Chat';

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Lấy dữ liệu id người dùng khi đăng nhập
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState({});

    //Lấy token người dùng
    const token = localStorage.getItem('authToken');

    //Lấy dữ liệu userId khi đăng nhập vào
    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserId(response.data);
                } catch (err) {
                    setError('Không thể lấy thông tin người dùng');
                }
            } else {
                setError('Bạn chưa đăng nhập');
            }
        };
        fetchUserData();
    }, []);
    return (
        <aside className={cx('sidebar')}>
            <ul className={cx('list_nav')}>
                <li className={cx('item_nav')}>
                    <Link to="/">{isHomePage ? <BiSolidHomeAlt2 /> : <BiHomeAlt2 />}</Link>
                </li>

                <li className={cx('item_nav')}>
                    <Link to="/Find">{isFindPage ? <BiSolidSearch /> : <BiSearch />}</Link>
                </li>
                <li className={cx('item_nav')}>
                    <Link to="/Notification">{isNotiPage ? <BiSolidHeart /> : <BiHeart />}</Link>
                </li>
                <li className={cx('item_nav')}>
                    <Link to="/Chat">{isChat ? <BiSolidChat /> : <BiChat />}</Link>
                </li>
                <li className={cx('item_nav')}>
                    <Link to="/Profile/">{isProfile ? <BiSolidUser /> : <BiUser />}</Link>
                </li>
                <li className={cx('item_nav')}>
                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className={cx('btn_menu')}
                            style={{fontSize: '30px', color:'#333'}}
                        >
                            <IoSettingsOutline />
                        </Button>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem><Link to={`http://localhost:3000/ChangPass/${userId.id}`}>Đổi Mật Khẩu</Link></MenuItem>
                        </Menu>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
