import classNames from 'classnames/bind';
import style from './Chat.module.scss';
import { Avatar } from '@mui/material';
import { BiImageAdd, BiX } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TimeUp from '~/components/TimeUp';

const cx = classNames.bind(style);
function Chat() {
    //Tạo useState lấy các user
    const [user, setUser] = useState([]);

    //Tạo useState gửi tin nhắn
    const [receiverId, setReceiverId] = useState('');
    const [content, setContent] = useState('');

    //Tạo useState lấy user để chat
    const [userChat, setUserChat] = useState({});

    //Tạo useState để lấy tất cả tin nhắn
    const [allMess, setAllMess] = useState([]);

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

    //Lấy dữ liệu tất cả tin nhắn
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get('http://localhost:8080/chat/all');

                setAllMess(response.data);
            } catch (err) {
                console.log('Không có dữ liệu message!');
            }
        };
        fetchMessage();
    }, [allMess]);

    //hàm gửi tin nhắn
    const sendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:8080/chat', {
                sender_id: userId.id,
                receiver_id: userChat.id,
                message_content: content,
                message_img: '1.png',
            });
            setAllMess((preMess) => [...preMess, response.data]);
            setContent('');
            console.log(response.data);
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            console.log(userId.id, userChat.id, content, '1.png');

            alert('Có lỗi xảy ra khi gửi tin nhắn.');
        }
    };

    
    // const sortUser = [...user].sort((a, b) => {
    //     if (lastMessagedUser) {
    //         if (a.id === lastMessagedUser.id) return -1;
    //         if (b.id === lastMessagedUser.id) return 1;
    //     }
    //     return 0;
    // });

    //hàm lấy tất cả người dùng
    const getUser = async () => {
        try {
            const reponse = await axios.get('http://localhost:8080/users');

            //tạo biến lọc user của mình
            const filterMyUserId = reponse.data.filter((user) => user.id !== userId.id);
            setUser(filterMyUserId);
            console.log(user);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        getUser();
    }, [userId.id]);

    //Lấy thông tin id người dùng để gửi tới họ

    const getUserById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/users/userId/${id}`);
            setUserChat(response.data);
            console.log(userChat);
        } catch (e) {
            console.log(e.message);
        }
    };

    //-----------------------------Xử lí nhập tin nhắn---------------------------------

    const [mess, setMess] = useState([]);

    const handlePostSubmit = () => {
        if (content.trim() !== '') {
            // Thêm nội dung mới vào danh sách bài đăng và xóa nội dung đã nhập sau khi đăng

            const newMess = { id: Date.now(), content: content.trim() };
            setMess([...mess, newMess]);
            setContent('');
        }
    };

    //tạo useState tìm user chat
    const [inputFind, SetInputFind] = useState('');
    //Tìm user by name
    // useEffect(() => {
    //     const handleFind = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/users/${inputFind}`);
    //             setUser(response.data);
    //         } catch (e) {
    //             console.log('không tìm thấy user');
    //         }
    //     };
    //     handleFind();
    // }, [inputFind]);
    const handleDeleteInputFind = () => {
        SetInputFind('');
    };

    const filteredUsers = user.filter((user) => user.username.toLowerCase().includes(inputFind.toLowerCase()));
    console.log(filteredUsers);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list_chat')}>
                <div className={cx('title_chat')}>
                    <span>Tin nhắn</span> <span>{userId.username}</span>
                </div>
                <div className={cx('wr_find_user_chat')}>
                    <input
                        placeholder="Nhập username..."
                        type="text"
                        value={inputFind}
                        onChange={(e) => SetInputFind(e.target.value)}
                    />

                    <button onClick={handleDeleteInputFind}>
                        <BiX />
                    </button>
                </div>
                {inputFind ? (
                    <>
                        {filteredUsers.map((item) => (
                            <div className={cx('user_chat')} key={item.id} onClick={() => getUserById(item.id)}>
                                <div className={cx('div_avatar')}>
                                    <Avatar sx={{ width: 60, height: 60 }} className={cx('avatar')} src={item.avatar} />
                                </div>

                                <div className={cx('name_user')}>
                                    <span className={cx('span_name_user')}>{item.username}</span> <br />
                                    <span className={cx('span_time_send_mess')}>Đã gửi 6 giờ trước</span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {user.map((item) => (
                            <div className={cx('user_chat')} key={item.id} onClick={() => getUserById(item.id)}>
                                <div className={cx('div_avatar')}>
                                    <Avatar sx={{ width: 60, height: 60 }} className={cx('avatar')} src={item.avatar} />
                                </div>

                                <div className={cx('name_user')}>
                                    <span className={cx('span_name_user')}>{item.username}</span> <br />
                                    <span className={cx('span_time_send_mess')}>Đã gửi 6 giờ trước</span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            {userChat && userChat.id ? (
                <div className={cx('chat')}>
                    <div className={cx('header_chat')}>
                        <div className={cx('div_avatar')}>
                            <Avatar sx={{ width: 60, height: 60 }} className={cx('avatar')} src={userChat.avatar} />
                        </div>
                        <div className={cx('wr_user_name')}>
                            <span className={cx('user_name')}>{userChat.name}</span>
                            <br />
                            <span className={cx('span_time_onl')}>Hoạt động 6 giờ trước</span>
                        </div>
                    </div>

                    <div className={cx('content_mess')}>
                        {allMess.map((item) =>
                            item.receiver_id === userChat.id && item.sender_id === userId.id ? (
                                <>
                                    <div className={cx('time_send')}>
                                        <TimeUp time={item.createdAt} />
                                    </div>
                                    <div className={cx('my_mess')}>
                                        <div className={cx('content_my_mess')} id={item.id}>
                                            {item.message_content}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                item.sender_id === userChat.id &&
                                item.receiver_id === userId.id && (
                                    <>
                                        <div className={cx('time_send')}>
                                            <TimeUp time={item.createdAt} />
                                        </div>
                                        <div className={cx('user_mess')}>
                                            <div className={cx('avatar_user_mess')}>
                                                <Avatar src={userChat.avatar} />
                                            </div>
                                            <div className={cx('content_user_mess')}>{item.message_content}</div>
                                        </div>
                                    </>
                                )
                            ),
                        )}
                    </div>
                    <div className={cx('wr_send_mess')}>
                        <div className={cx('wr_input_mess')}>
                            <input
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                type="text"
                                placeholder="Nhập tin nhắn.."
                            />

                            <div className={cx('wr_inp_img')}>
                                <input type="file" className={cx('inp_img')} />
                                <label>
                                    <BiImageAdd className={cx('img_icon')} />
                                </label>
                            </div>
                            <button onClick={sendMessage}>Gửi</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('chat')}>
                    <div className={cx('not_user')}>
                        <div className={cx('wr_icon_mess')}>
                            <svg
                                aria-label=""
                                class="x1lliihq x1n2onr6 x5n08af"
                                fill="currentColor"
                                height="96"
                                role="img"
                                viewBox="0 0 96 96"
                                width="96"
                            >
                                <title></title>
                                <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
                            </svg>
                        </div>
                        <div className={cx('content_not_user')}>
                            <h3>Tin nhắn của bạn</h3>
                            <p>Gửi ảnh và tin nhắn cho mọi người</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
