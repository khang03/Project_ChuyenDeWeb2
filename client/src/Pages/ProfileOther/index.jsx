import { Fragment, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import style from './ProfileOther.module.scss';
import classNames from 'classnames/bind';
import {
    BiXCircle,
    BiImageAdd,
    BiHeart,
    BiMessageRounded,
    BiShare,
    BiSolidHeart,
    BiRightArrowAlt,
} from 'react-icons/bi';
import { Avatar, Button, Menu, MenuItem, Fade, Switch, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FriendButton from '~/components/FriendButton';
const cx = classNames.bind(style);

function ProfileOther() {
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userLogin, setUserLogin] = useState({});
    const [error, setError] = useState('');
    const { username } = useParams();

    console.log(userLogin);
    console.log(user);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`http://localhost:8080/users/${username}`);
            setUser(response.data);
        };
        fetchPosts();
    }, []);

    //Lấy token người dùng
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    //Lấy dữ liệu userId khi đăng nhập vào
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
                    setUserLogin(response.data);
                } catch (err) {
                    setError('Không thể lấy thông tin người dùng');
                }
            } else {
                setError('Bạn chưa đăng nhập');
            }
        };
        fetchUserData();
    }, []);
    

    //----------------------------------------------Phan xu li render up post---------------------------------------
    const [btnUpLoad, setBtnUpLoad] = useState(false);

    //phan set true false cho man hinh up post
    const handleUpLoad = () => {
        setBtnUpLoad(true);
    };

    const containerRef = useRef(null);

    const unrenderUpPost = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setBtnUpLoad(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', unrenderUpPost);
        return () => {
            document.removeEventListener('mousedown', unrenderUpPost);
        };
    });

    

    

    return (
        <Fragment>
            {user.map((item) => (
                <div className={cx('wrapper')}>
                    <div className={cx('profile')}>
                        <div className={cx('wr_info')}>
                            <div className={cx('info')}>
                                <h2>{item.name}</h2>
                                <p className={cx('user_id')}>{item.username}</p>
                                <p className={cx('bio')}>{item.bio}</p>
                                <p className={cx('sum_fr')}>Có 10 bạn bè</p>
                            </div>
                            <div className={cx('wr_img_info')}>
                                <img src={item.avatar} alt="avata user" />
                            </div>
                        </div>
                        <div className={cx('wr_add_chat')}>
                            <div className={cx('wr_btn_edit_profile')}>
                                
                                <FriendButton id={userLogin.id} friendId={item.id}/>
                                
                            </div>
                            <div className={cx('wr_btn_chat')}>
                                <div className={cx('btn_title_edit')}> Nhắn tin</div>
                            </div>
                        </div>
                    </div>

                    

                   
                    
                </div>
            ))}
        </Fragment>
    );
}

export default ProfileOther;
