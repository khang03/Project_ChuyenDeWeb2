import { Fragment, useEffect, useRef, useState } from 'react';
import * as React from 'react';

import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import { Switch, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostUser from '~/components/PostUser';
import ModalPost from '~/components/ModalPost';

const cx = classNames.bind(style);

function Profile() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [showModalPost, setShowModalPost] = useState(false);

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
    // Lấy thông tin post :id

    useEffect(() => {
        axios
            .get(`http://localhost:8080/posts/user/${user.id}`)
            .then((response) => {
                const sortPost = response.data.posts.sort((a, b) => b.id - a.id);
                setPosts(sortPost);
            })

            .catch((error) => {
                console.log('Có lỗi ', error);
            });
    }, [user]);

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

    //Render image khi nhập từ input
    const [imageRender, setImageRender] = useState();

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];

        //Lấy link ảnh bằng cách đặt một thuộc tính
        file.preview = URL.createObjectURL(file);
        setImageRender(file);
        console.log(URL.createObjectURL(file));
    };

    //------------------------Render Edit profile------------------------------------------------------------------------

    const [editProfile, setEditProfile] = useState(false);

    //Phan set true false cho btn edit Profile
    const handleEdit = () => {
        setEditProfile(true);
    };

    const containerRefEditProfile = useRef(null);

    const unrenderEditProfile = (e) => {
        if (containerRefEditProfile.current && !containerRefEditProfile.current.contains(e.target)) {
            setEditProfile(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', unrenderEditProfile);
        return () => {
            document.removeEventListener('mousedown', unrenderEditProfile);
        };
    }, []);

    //Btn Trang rieng tu hoac cong khai
    const [loading, setLoading] = React.useState(true);
    function handleClickBtn() {
        setLoading(true);
    }

    //Xử lí chuyển đến trang chi tiết bài viết khi click vào bài post
    const navigation = useNavigate();

    const handleClickPage = () => {
        navigation('/DetailPost');
    };

    //Xử lí nút like bài viết
    const [like, setLike] = useState();
    const [countLike, setCountLike] = useState(0);
    const handleLike = async (id) => {
        setLike(true);
        if (like) {
            setCountLike(countLike - 1);
        } else {
            setCountLike(countLike + 1);
        }
        setLike(!like);
    };

    //Đây là phần chỉnh sửa trang cá nhân-----------------------------
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    // const [avatar, setAvatar] = useState();

    // const handlePreviewAvatar = (e) => {
    //     const file = e.target.files[0];
    //     file.preview = URL.createObjectURL(file)
    //     setAvatar(file);
    //     console.log(file.preview);

    // };

    const handleSubmitEditProfile = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/users/${user.id}`, {
                username: username,
                name: name,
                bio: bio,
            });
            
            // setUser((prevUser) =>
            //     prevUser.map((userId) =>
            //         userId.id === user.id ? { ...userId, username: username, name: name, bio: bio, avatar: avatar } : userId,
            //     ),)
        } catch {
            console.log('lỗi sửa user');
        }
    };

    return (
        <Fragment>
            {user && (
                <div className={cx('wrapper')} key={user.id}>
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
                        <div className={cx('wr_btn_edit_profile')} onClick={handleEdit}>
                            <div className={cx('btn_title_edit')}> Chỉnh sửa trang cá nhân</div>
                        </div>
                    </div>

                    <div className={cx('wr_upl')}>
                        <div className={cx('img_startus')}>
                            <img src={user.avatar} />
                        </div>
                        <div onClick={handleUpLoad} className={cx('des_startus')}>
                            <div className={cx('des')}>Có gì hot?</div>
                        </div>
                        <div className={cx('btn_upl_stt')}>
                            <button onClick={() => setShowModalPost(!showModalPost)} className={cx('btn_upload')}>
                                Đăng
                            </button>
                        </div>
                        {showModalPost && (
                            <ModalPost
                                user={user}
                                closeModal={() => setShowModalPost(false)}
                                isActiveAdd
                                nameModal="Đăng bài viết"
                                idUser={user.id}
                            />
                        )}
                    </div>

                    {posts.map((item) => {
                        return <PostUser setPosts={setPosts} user={user} item={item} isActiveEdit />;
                    })}
                </div>
            )}

            {/* Xử lí render info post */}

            {/* Xử lí render edit profile */}
            {editProfile && (
                <div className={cx('wr_position_up_post')}>
                    <div className={cx('relative_wr')}>
                        <div ref={containerRefEditProfile} className={cx('position_wr_add_post')}>
                            <div className={cx('wrapper')}>
                                <form onSubmit={handleSubmitEditProfile}>
                                    <div className={cx('wr_edit_item')}>
                                        <div className={cx('my_id')}>
                                            <span>Username</span>
                                            <br></br>
                                            <input
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                type="text"
                                                placeholder="Nhập username"
                                            />
                                        </div>
                                        <div className={cx('my_avatar')}>
                                            {/* <input type="file" onChange={handlePreviewAvatar} /> */}
                                            {/* {avatar && (
                                               <img src={avatar.preview} alt="my avatar"  width="30px"/>

                                            )} */}
                                            <img src={user.avatar} alt="my avatar" width="30px" />
                                        </div>
                                    </div>
                                    <div className={cx('wr_edit_item')}>
                                        <div className={cx('my_id')}>
                                            <p>Name</p>
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                type="text"
                                                placeholder="My_id"
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('wr_edit_item')}>
                                        <div className={cx('my_des')}>
                                            <p>Tiểu sử</p>
                                            <input
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                type="text"
                                                placeholder="Nhập tiểu sử..."
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('wr_edit_item')}>
                                        <div className={cx('my_status')}>
                                            <p>Trang cá nhân riêng tư</p>
                                            <FormControlLabel
                                                className={cx('status')}
                                                sx={{ display: 'block' }}
                                                control={
                                                    <Switch
                                                        checked={loading}
                                                        onChange={() => setLoading(!loading)}
                                                        name="loading"
                                                        color="primary"
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('btn_confirm')}>
                                        <button type="submit">Xong</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Profile;
