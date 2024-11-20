import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import style from './admin.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

function AdminPage() {
    //set trạng thái để render theo mục
    const [account, setAccount] = useState(true);
    const [postManager, setPostManager] = useState(false);
    const [commentManager, setCommentManager] = useState(false);

    //tạo useState lấy tất cả user và post
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const renderQuanLyUser = () => {
        setAccount(true);
        setPostManager(false);
        setCommentManager(false);
    };
    const renderQuanLyPost = () => {
        setAccount(false);
        setPostManager(true);
        setCommentManager(false);
    };

    const renderQuanLyBinhLuan = () => {
        setAccount(false);
        setPostManager(false);
        setCommentManager(true);
    };

    //useEffect để lấy tất cả user
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('http://localhost:8080/users');
            setUsers(response.data);
        };
        fetchUser();
    }, [users.length]);

    //useEffect để lấy tất cả posts
    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get('http://localhost:8080/posts');
            setPosts(response.data);
        };
        fetchPost();
    }, [posts.length]);

    //useEffect để lấy tất cả comment
    useEffect(() => {
        const fetchComment = async () => {
            const response = await axios.get('http://localhost:8080/comments');
            setComments(response.data);
        };
        fetchComment();
    }, [comments.length]);

    // handle Delete  user
    const handleDeleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/users/delete/${id}`);

            setUsers((prevUser) => {
                return prevUser.filter((user) => user.id !== id);
            });
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    //Tạo hàm để xoá bài viết
    const handleDeletePost = async (idPost) => {
        try {
            const response = await axios.delete(`http://localhost:8080/posts/delete/${idPost}`);
            setPosts((prevPost) => {
                return prevPost.filter((post) => post.id !== idPost);
            });
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };
    //Tạo hàm để xoá bình luận
    const handleDeleteComment = async (idComment) => {
        try {
            const response = await axios.delete(`http://localhost:8080/comments/${idComment}`);
            setComments((preComment) => {
                return preComment.filter((comment) => comment.id !== idComment);
            });
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    const cx = classNames.bind(style);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header_admin')}>
                <div className={cx('list_category')}>
                    <div className={cx('item_category')}
                        onClick={renderQuanLyUser}
                        style={account ? { color: '#333', fontWeight: 'bold' } : { color: '#919191' }}
                    >
                        Quản lý tài khoản
                    </div>
                    <div className={cx('item_category')}
                        onClick={renderQuanLyPost}
                        style={postManager ? { color: '#333', fontWeight: 'bold' } : { color: '#919191' }}
                    >
                        Quản lý bài viết
                    </div>
                    <div className={cx('item_category')}
                        onClick={renderQuanLyBinhLuan}
                        style={commentManager ? { color: '#333', fontWeight: 'bold' } : { color: '#919191' }}
                    >
                        Quản lý bình luận
                    </div>
                   

                </div>
            </div>
            <div className={cx('wrapper_content')}>
                {/* Render user --------------------------------- */}
                {account &&
                    users.map((user, index) => (
                        <div className={cx('content_User')} key={index}>
                            <div className={cx('avatar')}>
                                <img src={user.avatar} alt="" />
                            </div>
                            <div className={cx('info_user')}>
                                <span>{user.username}</span>
                                <br />
                                <span className={cx('name')}>{user.name}</span>
                            </div>
                            <div className={cx('action_user')}>
                                <button onClick={() => handleDeleteUser(user.id)} className={cx('btn_delete')}>
                                    <MdDeleteForever />
                                </button>
                            </div>
                        </div>
                    ))}

                {postManager &&
                    posts.map((post, index) => (
                        <div className={cx('content_Post')}>
                            <div className={cx('info_user')}>
                                <span>{post.oneUser.username}</span>
                                <br />
                                <span className={cx('content')}>{post.content}</span>
                            </div>
                            <div className={cx('image_post')}>
                                {post &&
                                    post.manyImage.map((item, index) => (
                                        <img key={index} src={`http://localhost:8080/uploads/${item.img_url}`} alt="" />
                                    ))}
                            </div>
                            <div className={cx('action_post')}>
                                <button onClick={() => handleDeletePost(post.id)} className={cx('btn_delete')}>
                                    <MdDeleteForever />
                                </button>
                            </div>
                        </div>
                    ))}

                {commentManager &&
                    comments.map((comment, index) => (
                        <div className={cx('content_Post')} key={index}>
                            <div className={cx('info_user')}>
                                {users.map(
                                    (user, index) =>
                                        user?.id === comment.user_id && <span key={index}>{user.username}</span>,
                                )}
                                <br />
                                <span className={cx('content')}>Đã bình luận: {comment.comment_content}</span>
                            </div>

                            <div className={cx('action_post')}>
                                <button onClick={() => handleDeleteComment(comment.id)} className={cx('btn_delete')}>
                                    <MdDeleteForever />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default AdminPage;
