import { BiXCircle, BiImageAdd, BiHeart, BiMessageRounded, BiShare, BiSolidHeart } from 'react-icons/bi';
import classNames from 'classnames/bind';
import style from './DetailPost.module.scss';
import { Fragment, useEffect, useState, useRef } from 'react';
import { Avatar, Button, Menu, MenuItem, Fade, Switch, FormControlLabel } from '@mui/material';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import TimeUp from '~/components/TimeUp';

const cx = classNames.bind(style);

function DetailPost() {
    //lấy danh sách user
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        axios
            .get(`http://localhost:8080/users`)

            .then((reponse) => setUsers(reponse.data))
            .catch((error) => console.log('Không lấy đƯợc dữ liệu', error));

        return () => {
            console.log('hihi');
        };
    }, []);

    const [post, setPost] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:8080/posts/${id}`)

            .then((reponse) => setPost(reponse.data))
            .catch((error) => console.log('Không lấy đƯợc dữ liệu', error));

        return () => {
            console.log('hihi');
        };
    }, [id]);

    // console.log(post);

    //Xét true false render like-----------------------------------------------------------------------------------------------------
    const [liked, setLiked] = useState(false);

    // Kiểm tra trạng thái like khi component load
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/likes/${userId.id}/${post.id}`);
                setLiked(response.data.liked);
                console.log(response.data.liked);
            } catch (error) {
                console.error('Error checking like status', error);
            }
        };
        checkLikeStatus();
    }, [userId.id, post.id]);

    //Xử lí nút like bài viết
    const [countLike, setCountLike] = useState(0);
    const [showHeart, setShowHeart] = useState(false);
    // const handleLike = () => {
    //     if (like) {
    //         setCountLike(countLike - 1);
    //     } else {
    //         setCountLike(countLike + 1);
    //     }

    // };

    const handleLike = async () => {
        try {
            const response = await axios.post('http://localhost:8080/likes', {
                user_id: userId.id,
                post_id: post.id,
            });

            setPost((prevPost) => {
                return {
                    ...prevPost,
                    // Likes: prevPost.Likes.length + 1,
                    manyLike: [
                        ...prevPost.manyLike,
                        {
                            id: Math.floor(100 + Math.random() * 900),
                            user_id: userId.id,
                        },
                    ],
                    // Likes: 3,
                };
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
    const handleUnLike = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/likes', {
                data: {
                    user_id: userId.id,
                    post_id: post.id,
                },
            });

            setPost((prevPost) => {
                const updateLike = prevPost.manyLike.filter((like) => like.user_id !== userId.id);
                return {
                    ...prevPost,
                    manyLike: updateLike,
                };
            });

            setLiked(false);
            setShowHeart(true);
            setTimeout(() => {
                setShowHeart(false);
            }, 1000);

            console.log('Like added:', response.data);
        } catch (error) {
            console.error('Error adding like:', error);
        }
    };

    const toggleLike = async () => {
        if (liked) {
            await handleUnLike();
        } else {
            await handleLike();
        }
    };
    //----------------------------------------------------COMMENT-------------------------------------------------------------
    //Xử lí thêm bình luận
    const [content, setContent] = useState('');
    const [dataComment, setDataComment] = useState([]);
    const [status, SetStatus] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8080/comments')
            .then((response) => {
                const sortComment = response.data.sort((a, b) => b.id - a.id);
                setDataComment(sortComment);
            })
            .catch((error) => console.log('Không lấy được dữ liệu', error));
    }, []);

    //đăng bình luận
    const handleSubmit = async (e) => {
        try {
            const response = await axios.post('http://localhost:8080/comments/', {
                id: Math.floor(100 + Math.random() * 900),

                comment_content: content,
                user_id: userId.id,
                post_id: post.id,
                createdAt: Date.now().toLocaleString(),
            });
            console.log('Comment added:', response.data);
            setContent('');

            console.log(post);
            // setDataComment((prevComments) =>
            //     prevComments.map((comment) =>
            //         comment.id === commentId ? { ...comment, comment_content: newContent } : comment,
            //     ),
            // );
        } catch (error) {
            console.error('Error adding comment:', error.response.data.error);
        }
    };

    // Hàm xử lý khi người dùng click vào nút "Đăng"

    //số lượng cmt
    // const [countComment, setCountComment] = useState(0);
    // const [dataComment, setDataComment] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:8080/comments')
    //         .then((reponse) => setDataComment(reponse.data))
    //         .catch((error) => console.log('Không lấy đƯợc dữ liệu', error));
    // }, []);

    // Xoá bình luận theo id bài viết

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/comments/${commentId}`);
            console.log(response.data.message); // Thông báo thành công

            // Cập nhật danh sách bình luận sau khi xóa
            setPost((prevPost) => ({
                ...prevPost,
                manyComment: prevPost.manyComment.filter((comment) => comment.id !== commentId),
            }));
        } catch (error) {
            console.error('Failed to delete comment:', error);
            setError('Failed to delete comment');
        }
        setBtnDelete(false);
    };

    //Sửa comment-------------------------------------------------------------------------------------

    const [newContent, setNewContent] = useState('');

    const handleUpdateComment = async (commentId) => {
        try {
            const response = await axios.put(`http://localhost:8080/comments/${commentId}`, {
                commentContent: newContent, // Nội dung bình luận mới
            });
            console.log(response.data.message); // Thông báo thành công

            // Cập nhật danh sách bình luận sau khi sửa
            setDataComment((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId ? { ...comment, comment_content: newContent } : comment,
                ),
            );
        } catch (error) {
            console.error('Failed to update comment:', error);
            setError('Failed to update comment');
        }
    };

    //----------------------------------------------Phan xu li render màn hình nhỏ---------------------------------------

    const [btnDelete, setBtnDelete] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [idComment, setIdComment] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [deletingCommentId, setDeletingCommentId] = useState(null);

    //phan set true false cho man hinh up post-------------------------------------------------
    const handleRenderDeleteComment = (commentId) => {
        setDeletingCommentId(commentId);
        setBtnDelete(true);
        setAnchorEl(null);
        console.log(deletingCommentId);
        console.log(commentId);
        
        
    };
    const handleEditComment = (commentId) => {
        setEditingCommentId(commentId);
        setEditComment(true);
        setAnchorEl(null);
    };

    const containerRef = useRef(null);

    const unrenderUpPost = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setBtnDelete(false);
            setEditComment(false);
        }
    };

    //Mouse ra ngoiaf sẽ tắt cửa sổ nhỏ
    useEffect(() => {
        document.addEventListener('mousedown', unrenderUpPost);
        return () => {
            document.removeEventListener('mousedown', unrenderUpPost);
        };
    });

    // Xử lí render menu của bài viết

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <div className={cx('wrapper_post')}>
                {post && post.oneUser && post.oneUser.avatar && (
                    <>
                        <div className={cx('wr_post')}>
                            <div className={cx('head_post')}>
                                <div className={cx('avatar_post')}>
                                    <img className={cx('avatar')} src={post.oneUser.avatar} />
                                </div>
                                <div className={cx('user_id_day')}>
                                    {post.oneUser.username !== userId.username ? (
                                        <Link to={`/profileOther/${post.oneUser.id}`}>
                                            <p>{post.oneUser.username}</p>
                                        </Link>
                                    ) : (
                                        <Link to={`/profile`}>
                                            <p>{post.oneUser.username}</p>
                                        </Link>
                                    )}
                                    <span>
                                        <TimeUp time={post.createdAt} />
                                    </span>
                                </div>
                            </div>
                            <p style={{ marginLeft: '60px' }}>{post.content}</p>

                            <div className={cx('content_post')}>
                                <div className={cx('content')}>
                                    {console.log(post.manyImage)}
                                    <div className={cx('file_post')}>
                                        {post.manyImage.map((image, index) => (
                                            <img
                                                key={image.id}
                                                src={`http://localhost:8080/uploads/${image.img_url}`}
                                                alt=""
                                                onDoubleClick={handleLike}
                                            />
                                        ))}
                                    </div>
                                    {showHeart && (
                                        <div
                                            className={cx('show_heart')}
                                            style={liked ? { color: '#d63232' } : { color: '#fff' }}
                                        >
                                            <BiSolidHeart />
                                        </div>
                                    )}
                                </div>
                                <div className={cx('interact')}>
                                    <button onClick={toggleLike} className={cx('like')}>
                                        {liked ? <BiSolidHeart style={{ color: '#d63232' }} /> : <BiHeart />}{' '}
                                    </button>
                                    <label>{post.manyLike.length}</label>
                                    <button className={cx('comment')}>
                                        <BiMessageRounded />{' '}
                                    </button>{' '}
                                    <label>{post.manyComment.length}</label>
                                    <button className={cx('share')}>
                                        <BiShare />
                                    </button>{' '}
                                    <label>Share</label>
                                </div>
                            </div>
                        </div>
                        <div className={cx('tittle_comment')}>Comment</div>
                        {post.manyComment ? (
                            post.manyComment.map((comment, index) => (
                                <div className={cx('wr_comment')} key={comment?.id}>
                                    <div className={cx('comment')}>
                                        {/* Render avatar của comment */}
                                        {users.map((user, index) =>
                                            user.id === comment?.user_id ? (
                                                <>
                                                    <div className={cx('wr_avatar')} key={user.id}>
                                                        <img
                                                            key={user.id}
                                                            src={user.avatar}
                                                            alt="avatar user comment"
                                                        />
                                                    </div>

                                                    <div className={cx('content')}>
                                                        <div className={cx('user_time')}>
                                                            <p className={cx('user_id')}>{user.username} </p>
                                                            <span>
                                                                <TimeUp time={comment?.createdAt} />
                                                            </span>
                                                        </div>
                                                        <p className={cx('content_des')}>{comment.comment_content}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            ),
                                        )}
                                        <>
                                            {userId?.id === comment?.user_id ? (
                                                <div className={cx('wr_btn_up_comment')} key={comment?.id}>
                                                    <div className={cx('menu')}>
                                                        <Button
                                                            key={comment?.id}
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
                                                            id="fade-menu"
                                                            MenuListProps={{
                                                                'aria-labelledby': 'fade-button',
                                                            }}
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            TransitionComponent={Fade}
                                                        >
                                                            <MenuItem onClick={() => handleEditComment(comment?.id)}>
                                                                Sửa Bình luận
                                                            </MenuItem>
                                                            <MenuItem
                                                                style={{ color: '#d63232' }}
                                                                onClick={() => handleRenderDeleteComment(comment?.id)}
                                                            >
                                                                Xoá bình luận
                                                            </MenuItem>
                                                        </Menu>
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </>

                                        <></>
                                    </div>

                                    <>
                                        {editComment && editingCommentId === comment?.id && (
                                            <div className={cx('wr_position_up_post')}>
                                                <div className={cx('relative_wr')}>
                                                    {/* {editingId === post.id && ( */}
                                                    <div ref={containerRef} className={cx('position_wr_add_post')}>
                                                        <div className={cx('tittle_delete')}>Nhập bình luận mới</div>

                                                        <div className={cx('wr_inp_new_comment')}>
                                                            <form onSubmit={() => handleUpdateComment(comment.id)}>
                                                                <input
                                                                    value={newContent}
                                                                    placeholder={comment.comment_content}
                                                                    type="text"
                                                                    onChange={(e) => setNewContent(e.target.value)}
                                                                />

                                                                <button
                                                                    type="submit"
                                                                    className={cx('btn_edit_comment')}
                                                                >
                                                                    Đăng
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    {/* )} */}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                    <>
                                        {/* render ra cửa sổ xác nhận xoá bài viết */}
                                        {btnDelete && deletingCommentId === comment?.id && (
                                            <div className={cx('wr_position_up_post')} key={userId?.id}>
                                                
                                                <div className={cx('relative_wr')}>
                                                    <div ref={containerRef} className={cx('position_wr_add_post')}>
                                                        <div className={cx('tittle_delete')}>Xác nhận xoá</div>
                                                        <div className={cx('wr_btn_del_comment')}>
                                                            <button
                                                                onClick={() => handleDeleteComment(comment?.id)}
                                                                key={post.id}
                                                                className={cx('btn_delete_comment')}
                                                            >
                                                                Xoá {comment?.comment_content}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}

                        {/* Render màn hình chỉnh sửa khi click chỉnh sửa */}

                        <div className={cx('wr_inp_comment')}>
                            <form onSubmit={handleSubmit}>
                                <input
                                    maxLength={100}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    type="text"
                                    placeholder="Nhập Bình Luận ..."
                                    required
                                />
                                <button type="submit">Đăng</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
            {/* Xử lí render info post */}
        </Fragment>
    );
}

export default DetailPost;
