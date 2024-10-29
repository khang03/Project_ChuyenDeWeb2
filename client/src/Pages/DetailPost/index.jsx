import { BiXCircle, BiImageAdd, BiHeart, BiMessageRounded, BiShare, BiSolidHeart } from 'react-icons/bi';
import classNames from 'classnames/bind';
import style from './DetailPost.module.scss';
import { Fragment, useEffect, useState, useRef } from 'react';
import { Avatar, Button, Menu, MenuItem, Fade, Switch, FormControlLabel } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(style);
// const arr_post = [
//     {
//         post_id: 1,
//         description: 'Hôm nay buồn quá các bạn',
//         img: 'https://th.bing.com/th/id/OIP._9ASq3twoUAAMV6Xb-uvlwHaFm?rs=1&pid=ImgDetMain',
//     },
//     {
//         post_id: 2,
//         description: 'Khá đẹp trai',
//         img: 'https://th.bing.com/th/id/OIP.hvq1mk4KaOTVcy_L-CY5xgHaFb?w=231&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
//     },
//     {
//         post_id: 3,
//         description: 'Em khang mafia',
//         img: 'https://th.bing.com/th/id/OIP.XiwYd2wYl5HB7NVFZXe8gAHaHa?w=163&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
//     },
//     {
//         post_id: 4,
//         description: 'Có những thứ đâu phải nói z là z',
//         img: 'https://th.bing.com/th/id/OIP._9ASq3twoUAAMV6Xb-uvlwHaFm?rs=1&pid=ImgDetMain',
//     },
//     {
//         post_id: 5,
//         description: 'aaaaaaaaaaaaaaaaaaaaaaa',
//         img: 'https://th.bing.com/th/id/OIP._9ASq3twoUAAMV6Xb-uvlwHaFm?rs=1&pid=ImgDetMain',
//     },
//     {
//         post_id: 6,
//         description: 'Hello cả nhà yêu của Kem',
//         img: 'https://th.bing.com/th/id/OIP.SsnrO7pzZHaycvEAI7gQ2AHaEn?w=280&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
//     },
//     {
//         post_id: 7,
//         description: 'Olele Olala',
//         img: 'https://th.bing.com/th/id/OIP.6nDu0p6RwW2arJTCOU2pCQHaDt?w=327&h=174&c=7&r=0&o=5&dpr=1.3&pid=1.7',
//     },
//     {
//         post_id: 8,
//         description: 'Trời hôm nay nhiều mây cực',
//         img: 'https://th.bing.com/th/id/OIP._9ASq3twoUAAMV6Xb-uvlwHaFm?rs=1&pid=ImgDetMain',
//     },
//     {
//         post_id: 9,
//         description: 'Mẹ ơi, thằng con trai của mẹ là một thằng phản bội',
//         img: 'https://th.bing.com/th/id/OIP._9ASq3twoUAAMV6Xb-uvlwHaFm?rs=1&pid=ImgDetMain',
//     },
//     {
//         post_id: 10,
//         description: 'Hôm nay vui quá các bạn',
//         img: 'https://th.bing.com/th/id/OIP._9ASq3twoUAAMV6Xb-uvlwHaFm?rs=1&pid=ImgDetMain',
//     },
// ];
function DetailPost() {
    const { id } = useParams();
    const [post, setPost] = useState({});
  
    useEffect(() => {
      const fetchPost = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setPost(response.data);
      };
  
      fetchPost();
    },[]);

    
    //Xử lí nút like bài viết
    const [like, setLike] = useState();
    const [countLike, setCountLike] = useState(0);
    const [showHeart, setShowHeart] = useState(false);
    const handleLike = () => {
        setLike(true);
        if (like) {
            setCountLike(countLike - 1);
        } else {
            setCountLike(countLike + 1);
        }
        setLike(!like);

        setShowHeart(true);
        setTimeout(() => {
            setShowHeart(false);
        }, 1000);
    };

    //Xử lí thêm bình luận
    const [inputValue, setInputValue] = useState('');
    const [posts, setPosts] = useState([]);

    // Hàm xử lý khi người dùng nhập vào ô input
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Hàm xử lý khi người dùng click vào nút "Đăng"

    //số lượng cmt
    const [countComment, setCountComment] = useState(0);

    const handlePostSubmit = () => {
        if (inputValue.trim() !== '') {
            // Thêm nội dung mới vào danh sách bài đăng và xóa nội dung đã nhập sau khi đăng

            const newComment = { id: Date.now(), text: inputValue.trim() };
            setPosts([...posts, newComment]);
            setInputValue('');
            setCountComment((prev) => prev + 1);
        }
    };

    //Xoá bình luận theo id bài viết
    const deleteComment = (id) => {
        const updateComment = posts.filter((posts) => posts.id !== id);
        setPosts(updateComment);
        setBtnDelete(false);
        setCountComment((prev) => prev - 1);
    };

    //Chỉnh sửa comment
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    const handleSave = () => {
        setPosts(posts.map((post) => (post.id === editingId ? { ...post, text: editingText } : post)));
        setEditingId(null);
        setEditingText('');
        setEditComment(false);
    };
    //----------------------------------------------Phan xu li render màn hình nhỏ---------------------------------------

    const [btnDelete, setBtnDelete] = useState(false);
    const [editComment, setEditComment] = useState(false);

    //phan set true false cho man hinh up post
    const handleDelete = () => {
        setBtnDelete(true);
        setAnchorEl(null);
    };
    const handleEditComment = (id, text) => {
        setEditComment(true);
        setAnchorEl(null);
        setEditingId(id);
        setEditingText(text);
    };

    const containerRef = useRef(null);

    const unrenderUpPost = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setBtnDelete(false);
            setEditComment(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', unrenderUpPost);
        return () => {
            document.removeEventListener('mousedown', unrenderUpPost);
        };
    });

    // Xử lí render menu của bài viết

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('wr_post')}>
                    <div className={cx('head_post')}>
                        <div className={cx('avatar_post')}>
                            <img
                                className={cx('avatar')}
                                src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                            />
                        </div>
                        <div className={cx('user_id_day')}>
                            <p>{post.id}</p>
                            <span>01/01/2024</span>
                        </div>
                    </div>
                    <div className={cx('content_post')}>
                        <div className={cx('content')}>
                            <p>{post.title}</p>
                            <div className={cx('file_post')}>
                                <img
                                    src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                                    alt=""
                                    onDoubleClick={handleLike}
                                />
                            </div>
                            {showHeart && (
                                <div
                                    className={cx('show_heart')}
                                    style={like ? { color: '#d63232' } : { color: '#fff' }}
                                >
                                    <BiSolidHeart />
                                </div>
                            )}
                        </div>
                        <div className={cx('interact')}>
                            <button onClick={handleLike} className={cx('like')}>
                                {like ? <BiSolidHeart style={{ color: '#d63232' }} /> : <BiHeart />}{' '}
                            </button>
                            <label>{countLike}</label>
                            <button className={cx('comment')}>
                                <BiMessageRounded />{' '}
                            </button>{' '}
                            <label>{countComment}</label>
                            <button className={cx('share')}>
                                <BiShare />
                            </button>{' '}
                            <label>Share</label>
                        </div>
                    </div>
                </div>
                <div className={cx('tittle_comment')}>Comment</div>
                {posts.map((post, index) => (
                    <div className={cx('wr_comment')}>
                        <div className={cx('comment')}>
                            <div className={cx('wr_avatar')}>
                                <img
                                    src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                                    alt=""
                                />
                            </div>
                            <div className={cx('content')}>
                                <p className={cx('user_id')}>user_id </p>
                                <p className={cx('content_des')}>{post.text}</p>
                            </div>
                            <div className={cx('wr_btn_up_comment')}>
                                <div className={cx('menu')}>
                                    <Button
                                        id="fade-button"
                                        aria-controls={open ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        className={cx('btn_menu')}
                                    >
                                        ...
                                    </Button>
                                    <Menu
                                        className={cx('wr_menu')}
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem
                                            className={cx('menu_item')}
                                            onClick={() => handleEditComment(post.id, post.text)}
                                        >
                                            Chỉnh sửa
                                        </MenuItem>
                                        <MenuItem onClick={handleDelete}>Xoá bài viết</MenuItem>
                                    </Menu>
                                </div>
                                {/* <button className={cx('btn_delete')} key={post.id} onClick={handleUpLoad}>
                                    Xoá
                                </button> */}
                            </div>
                        </div>
                        {btnDelete && (
                            <div className={cx('wr_position_up_post')}>
                                <div className={cx('relative_wr')}>
                                    <div ref={containerRef} className={cx('position_wr_add_post')}>
                                        <div className={cx('tittle_delete')}>Xác nhận xoá</div>
                                        <div className={cx('wr_btn_del_comment')}>
                                            <button
                                                key={post.id}
                                                className={cx('btn_delete_comment')}
                                                onClick={() => deleteComment((post.id = index))}
                                            >
                                                Xoá
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Render màn hình chỉnh sửa khi click chỉnh sửa */}
                        {editComment && (
                            <div className={cx('wr_position_up_post')} id={post.id}>
                                <div className={cx('relative_wr')}>
                                    {editingId === post.id && (
                                        <div ref={containerRef} className={cx('position_wr_add_post')}>
                                            <div className={cx('tittle_delete')}>Nhập bình luận mới</div>

                                            <div className={cx('wr_inp_new_comment')}>
                                                <input
                                                    placeholder={post.text}
                                                    type="text"
                                                    onChange={(e) => setEditingText(e.target.value)}
                                                />

                                                <button onClick={handleSave} className={cx('btn_edit_comment')}>
                                                    Đăng
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                <div className={cx('wr_inp_comment')}>
                    <input
                        maxLength={100}
                        value={inputValue}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Nhập Bình Luận ..."
                    />
                    <button type="submit" onClick={handlePostSubmit}>
                        Đăng
                    </button>
                </div>
            </div>
            {/* Xử lí render info post */}
        </Fragment>
    );
}

export default DetailPost;
