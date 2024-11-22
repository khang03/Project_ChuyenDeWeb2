import classNames from 'classnames/bind';
import { BiHeart, BiSolidHeart, BiMessageRounded, BiShare } from 'react-icons/bi';
import style from './PostUser.module.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Menu, MenuItem, Fade } from '@mui/material';
import ModalPost from '../ModalPost';
import { toast } from 'react-toastify';
import TimeUp from '../TimeUp';

const cx = classNames.bind(style);

/* Mô tả đầu vào của component
isActiveEdit(boolen): sử dụng khi cần render thêm chỉnh sửa, và xóa bài viết
setPosts : ?
user: truyền thông tin user vào component
item: truyền 1 đối tượng post vào component
index: ?
*/

const PostUser = ({ isActiveEdit, setPosts, user, item, index }) => {
    //Tạo usestate lấy dữ liệu bài viết

    // Xử lí nút like bài viết
    const [liked, setLiked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [openMenus, setOpenMenus] = useState({});
    const [selectedModal, setSelectedModal] = useState({});

    const handleClick = (id, event) => {
        setOpenMenus((pre) => ({
            ...pre,
            [id]: event.currentTarget,
        }));
    };
    const handleClose = (id) => {
        setOpenMenus((pre) => ({
            ...pre,
            [id]: null,
        }));
    };

    // handle Edit Post of user
    const handleEditPost = (id, imgs, content) => {
        setShowModal(true);
        setSelectedModal({ id, imgs, content });
        setOpenMenus((pre) => ({
            ...pre,
            [id]: null,
        }));
    };

    // handle Delete Post of user
    const handleDeletePost = (id) => {
        axios
            .delete(`http://localhost:8080/posts/delete/${id}`)
            .then((response) => {
                toast(response.data.message, { position: 'bottom-center' });
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.message, { position: 'bottom-center' });
                }
            });
    };

    const handleLike = async (postId) => {
        try {
            const response = await axios.post('http://localhost:8080/likes', {
                user_id: user.id,
                post_id: postId,
            });

            setPosts((prevPosts) => {
                return prevPosts.map((post) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            manyLike: [
                                ...post.manyLike,
                                {
                                    id: Math.floor(100 + Math.random() * 900), // Tạo id ngẫu nhiên cho like
                                    user_id: user.id, // Lưu id của người dùng
                                },
                            ],
                        };
                    }
                    return post; // Không thay đổi bài viết khác
                });
            });

            setLiked(true);
            setShowHeart(true);
            setTimeout(() => {
                setShowHeart(false);
            }, 1000);

            console.log('Like added:', response.data);
        } catch (error) {
            console.error('Error adding like:', error);
        }
    };

    //Xoá Like
    const handleUnLike = async (postId) => {
        try {
            const response = await axios.delete('http://localhost:8080/likes', {
                data: {
                    user_id: user.id,
                    post_id: postId,
                },
            });

            setPosts((prevPosts) => {
                return prevPosts.map((post) => {
                    if (post.id === postId) {
                        // Xoá like của người dùng hiện tại
                        return {
                            ...post,
                            manyLike: post.manyLike.filter((like) => like.user_id !== user.id), // Loại bỏ like của user
                        };
                    }
                    return post; // Không thay đổi bài viết khác
                });
            });

            setLiked(false);
            // setShowHeart(true);
            setTimeout(() => {
                setShowHeart(false);
            }, 1000);

            console.log('Like added:', response.data);
        } catch (error) {
            console.error('Error adding like:', error);
        }
    };

    const toggleLike = async (postId) => {
        if (liked) {
            await handleUnLike(postId);
        } else {
            await handleLike(postId);
        }
    };
    // Kiểm tra trạng thái like khi component load
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/likes/${user.id}/${item.id}`);
                setLiked(response.data.liked);
            } catch (error) {
                console.error('Error checking like status', error);
            }
        };
        checkLikeStatus();
    }, [user, item]);

    console.log(item);

    return (
        <>
            <div className={cx('post')} key={item.id}>
                <>
                    <div className={cx('wr_startus_post')}>
                        <div className={cx('img_startus')}>
                            <img alt="" src={item.oneUser.avatar} />
                        </div>
                        <div className={cx('wr_des_post')}>
                            <div className={cx('user_id')}>
                                <p>{item.oneUser.username}</p>{' '}
                                <span>
                                    <TimeUp time={item.createdAt} />
                                </span>
                            </div>
                            <div className={cx('des_post')}>
                                <p>{item.content}</p>
                            </div>
                        </div>

                        {isActiveEdit && (
                            <div className={cx('menu')}>
                                <Button
                                    id="fade-button"
                                    aria-controls={openMenus[item.id] ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openMenus[item.id] ? 'true' : undefined}
                                    onClick={(e) => handleClick(item.id, e)}
                                    className={cx('btn_menu')}
                                >
                                    <span style={{ fontSize: '20px' }}>...</span>
                                </Button>
                                <Menu
                                    className={cx('wr_menu')}
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={openMenus[item.id]}
                                    open={Boolean(openMenus[item.id])}
                                    onClose={() => handleClose(item.id)}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem
                                        className={cx('menu_item')}
                                        onClick={() => handleEditPost(item.id, item.manyImage, item.content)}
                                    >
                                        Chỉnh sửa
                                    </MenuItem>
                                    <MenuItem onClick={() => handleDeletePost(item.id)}>Xoá bài viết</MenuItem>
                                </Menu>
                            </div>
                        )}
                        {showModal && (
                            <ModalPost
                                isActiveEdit
                                nameModal="Sửa"
                                closeModal={() => setShowModal(false)}
                                idPost={selectedModal.id}
                                imgs={selectedModal.imgs}
                                txt={selectedModal.content}
                                user={user}
                            />
                        )}
                    </div>
                    <div className={cx('wr_image_post')}>
                        <div className={cx('list_image_post')}>
                            {item.manyImage.map((image, index) => (
                                <img
                                    key={index}
                                    alt=""
                                    className={cx('image_post')}
                                    src={`http://localhost:8080/uploads/${image.img_url}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={cx('interact')}>
                        <button className={cx('like')} onClick={() => toggleLike(item.id)}>
                            {liked ? <BiSolidHeart style={{ color: '#d63232' }} /> : <BiHeart />}{' '}
                        </button>{' '}
                        <label>{item.manyLike.length}</label>
                        <Link to={`/DetailPost/${item.id}`}>
                            <button className={cx('comment')}>
                                <BiMessageRounded />{' '}
                            </button>{' '}
                        </Link>
                        <label>Comment</label>
                        <button className={cx('share')}>
                            <BiShare />
                        </button>{' '}
                        <label>Share</label>
                    </div>
                </>
            </div>

            <hr />
        </>
    );
};

export default PostUser;
