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

    console.log(user);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`http://localhost:8080/users/${username}`);
            setUser(response.data[0]);
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

    console.log(user);

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
            {user && (
                <div className={cx('wrapper')}>
                    <div className={cx('profile')}>
                        <div className={cx('wr_info')}>
                            <div className={cx('info')}>
                                <h2>{user.name}</h2>
                                <p className={cx('user_id')}>{user.username}</p>
                                <p className={cx('bio')}>{user.bio}</p>
                                <p className={cx('sum_fr')}>Có 10 bạn bè</p>
                            </div>
                            <div className={cx('wr_img_info')}>
                                <img src={user.avatar} alt="avata user" />
                            </div>
                        </div>
                        <div className={cx('wr_add_chat')}>
                            {user.status === 0 ? (
                                <>
                                    <div className={cx('wr_btn_edit_profile')}>
                                        <FriendButton status={user.status} id={userLogin.id} friendId={user.id} />
                                    </div>
                                    <div className={cx('wr_btn_chat')}>
                                        <div className={cx('btn_title_edit')}> Nhắn tin</div>
                                    </div>
                                </>
                            ) : (
                                <div className={cx('wr_btn_private')}>
                                    <FriendButton status={user.status} id={userLogin.id} friendId={user.id} />
                                </div>
                            )}
                        </div>
                    </div>
                    {user.status === 0 ? (
                        <></>
                    ) : (
                        <div className={cx('status')}>
                            <div className={cx('logo_private')}>
                                <svg
                                    aria-label=""
                                    class="x1lliihq x1n2onr6 x5n08af"
                                    fill="currentColor"
                                    height="48"
                                    role="img"
                                    viewBox="0 0 96 96"
                                    width="48"
                                >
                                    <title></title>
                                    <circle
                                        cx="48"
                                        cy="48"
                                        fill="none"
                                        r="47"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    ></circle>
                                    <path
                                        d="M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    ></path>
                                </svg>
                            </div>
                            <div className={cx('text_private')}>
                                Đây là tài khoản riêng tư bạn không thể xem các bài viết từ họ.
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
}

export default ProfileOther;
