import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import { BiSolidChevronsRight } from 'react-icons/bi';
import style from './admin.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import TimeUp from '~/components/TimeUp';
import { FaHistory } from 'react-icons/fa';
function AdminPage() {
    //set trạng thái để render theo mục
    const [account, setAccount] = useState(true);
    const [postManager, setPostManager] = useState(false);
    const [commentManager, setCommentManager] = useState(false);
    const [reportPort, setReportPost] = useState(false);

    //tạo useState lấy tất cả user và post
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    //Tạo useState lấy thông báo report cho admin
    const [report, setReport] = useState([]);

    const renderQuanLyUser = () => {
        setAccount(true);
        setPostManager(false);
        setCommentManager(false);
        setReportPost(false);
    };
    const renderQuanLyPost = () => {
        setAccount(false);
        setPostManager(true);
        setCommentManager(false);
        setReportPost(false);
    };

    const renderQuanLyBinhLuan = () => {
        setAccount(false);
        setPostManager(false);
        setReportPost(false);
        setCommentManager(true);
    };
    const renderReportPost = () => {
        setAccount(false);
        setPostManager(false);
        setCommentManager(false);
        setReportPost(true);
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

    //Tạo hàm để xoá bài viết trong report
    const handleDeletePostReport = async (idPost, user_id, user_id_send, message) => {
        try {
            axios.post('http://localhost:8080/notification/', {
                user_id: user_id,
                user_id_send: user_id_send,
                post_id: idPost,
                message: `Chúng tôi đã phát hiện bài viết của bạn có hành vi ${message}. Mong bạn giữ gìn văn hoá tốt đẹp trên nền tảng của chúng tôi.`,
                role: 0,
            });
            const response = await axios.delete(`http://localhost:8080/posts/delete/${idPost}`);

            console.log(user_id_send);

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

    //Lấy tất cả các thông báo có role là 1
    useEffect(() => {
        const fetchNotification = async () => {
            const response = await axios.get('http://localhost:8080/notification/');
            setReport(response.data.notification);
        };

        fetchNotification();
    }, []);

    const handleDeteleNoti = (id) => {
        try {
            axios.delete(`http://localhost:8080/notification/delete/${id}`);
            alert('Xoá thành công');
            setReport((prevReport) => {
                return prevReport.filter((report) => report.id !== id);
            });
        } catch {
            console.log('không thể xoá');
        }
    };

    const cx = classNames.bind(style);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header_admin')}>
                <div className={cx('list_category')}>
                    <div
                        className={cx('item_category')}
                        onClick={renderQuanLyUser}
                        style={
                            account
                                ? {
                                      color: '#03846aed',
                                      fontWeight: 'bold',
                                      borderBottom: '3px solid #03846ab5',
                                      backgroundColor: '#024a3b0a',
                                  }
                                : { color: '#919191' }
                        }
                    >
                        Quản lý tài khoản
                    </div>
                    <div
                        className={cx('item_category')}
                        onClick={renderQuanLyPost}
                        style={
                            postManager
                                ? {
                                      color: '#03846aed',
                                      fontWeight: 'bold',
                                      borderBottom: '3px solid #03846ab5',
                                      backgroundColor: '#024a3b0a',
                                  }
                                : { color: '#919191' }
                        }
                    >
                        Quản lý bài viết
                    </div>
                    <div
                        className={cx('item_category')}
                        onClick={renderQuanLyBinhLuan}
                        style={
                            commentManager
                                ? {
                                      color: '#03846aed',
                                      fontWeight: 'bold',
                                      borderBottom: '3px solid #03846ab5',
                                      backgroundColor: '#024a3b0a',
                                  }
                                : { color: '#919191' }
                        }
                    >
                        Quản lý bình luận
                    </div>
                    <div
                        onClick={renderReportPost}
                        className={cx('item_category')}
                        style={
                            reportPort
                                ? {
                                      color: '#03846aed',
                                      fontWeight: 'bold',
                                      borderBottom: '3px solid #03846ab5',
                                      backgroundColor: '#024a3b0a',
                                  }
                                : { color: '#919191' }
                        }
                    >
                        Báo cáo bài viết
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

                {reportPort &&
                    report.map((report, index) =>
                        posts.map(
                            (post) =>
                                post.id === report.post_id && (
                                    <div className={cx('content_Post')} key={index}>
                                        <div className={cx('info_user')}>
                                            {users.map(
                                                (user, index) =>
                                                    user?.id === report.user_id && (
                                                        <p key={index}>
                                                            Chủ bài viết:{' '}
                                                            <Link
                                                                style={{ fontWeight: 'bold' }}
                                                                to={`/ProfileOther/${user.id}`}
                                                            >
                                                                {user.username}
                                                            </Link>
                                                        </p>
                                                    ),
                                            )}

                                            <p className={cx('content')}>Nội dung: {post.content}</p>

                                            <p>Lí do: {report.message}</p>
                                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                                <FaHistory />
                                                &nbsp; <TimeUp time={report.createdAt} />
                                            </span>
                                        </div>
                                        <div className={cx('image_post')}>
                                            {post &&
                                                post.manyImage.map((item, index) => (
                                                    <img
                                                        key={index}
                                                        src={`http://localhost:8080/uploads/${item.img_url}`}
                                                        alt=""
                                                    />
                                                ))}
                                        </div>

                                        <div className={cx('action_post')}>
                                            <Link className={cx('detail_post')} to={`/DetailPost/${post.id}`}>
                                                Xem <BiSolidChevronsRight />
                                            </Link>
                                            <br />

                                            <button
                                                onClick={() =>
                                                    handleDeletePostReport(
                                                        post.id,
                                                        post.user_id,
                                                        userId.id,
                                                        report.message,
                                                    )
                                                }
                                                className={cx('btn_delete')}
                                            >
                                                Xoá bài viết
                                            </button>
                                        </div>
                                    </div>
                                ),
                        ),
                    )}
            </div>
        </div>
    );
}

export default AdminPage;
