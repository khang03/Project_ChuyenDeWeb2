import classNames from 'classnames/bind';
import style from './Chat.module.scss';
import { Avatar } from '@mui/material';
import { BiImageAdd } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);
function Chat() {
    const [user, setUser] = useState([]);

    const getUser = async () => {
        try {
            const reponse = await axios.get('http://localhost:8080/users');
            setUser(reponse.data);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    //-----------------------------Xử lí nhập tin nhắn---------------------------------

    const [inputValue, setInputValue] = useState('');

    const [mess, setMess] = useState([]);

    // Hàm xử lý khi người dùng nhập vào ô input
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handlePostSubmit = () => {
        if (inputValue.trim() !== '') {
            // Thêm nội dung mới vào danh sách bài đăng và xóa nội dung đã nhập sau khi đăng

            const newMess = { id: Date.now(), text: inputValue.trim() };
            setMess([...mess, newMess]);
            setInputValue('');
            console.log(...mess);
            

        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list_chat')}>
                <div className={cx('title_chat')}>Tin nhắn</div>
                {user.map((item) => (
                    <div className={cx('user_chat')}>
                        <div className={cx('div_avatar')}>
                            <Avatar sx={{ width: 60, height: 60 }} className={cx('avatar')} src={item.avatar} />
                        </div>

                        <div className={cx('name_user')}>
                            <span className={cx('span_name_user')}>{item.name}</span> <br />
                            <span className={cx('span_time_send_mess')}>Đã gửi 6 giờ trước</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('chat')}>
                <div className={cx('header_chat')}>
                    <div className={cx('div_avatar')}>
                        <Avatar
                            sx={{ width: 60, height: 60 }}
                            className={cx('avatar')}
                            src="https://i.pravatar.cc/150?img=1"
                        />
                    </div>
                    <div className={cx('wr_user_name')}>
                        <span className={cx('user_name')}>Nguyễn Văn A</span>
                        <br />
                        <span className={cx('span_time_onl')}>Hoạt động 6 giờ trước</span>
                    </div>
                </div>

                <div className={cx('content_mess')}>
                    {mess.map((item , index) => (

                    <div className={cx('my_mess')}>
                        <div className={cx('content_my_mess')} id={item.id}>
                            {item.text}
                        </div>
                    </div>
                    ))}
                    <div className={cx('user_mess')}>
                        <div className={cx('avatar_user_mess')}>
                            <Avatar src="https://th.bing.com/th/id/OIP.6nDu0p6RwW2arJTCOU2pCQHaDt?rs=1&pid=ImgDetMain" />
                        </div>
                        <div className={cx('content_user_mess')}>hehe</div>

                    </div>
                </div>
                <div className={cx('wr_send_mess')}>
                    <div className={cx('wr_input_mess')}>
                        <input
                            onChange={handleInputChange}
                            value={inputValue}
                            type="text"
                            placeholder="Nhập tin nhắn.."
                        />

                        <div className={cx('wr_inp_img')}>
                            <input type="file" className={cx('inp_img')} />
                            <label>
                                <BiImageAdd className={cx('img_icon')} />
                            </label>

                        </div>
                            <button onClick={handlePostSubmit}>Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
