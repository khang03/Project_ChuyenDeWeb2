import classNames from 'classnames/bind';
import style from './Chat.module.scss';
import { Avatar } from '@mui/material';
import { BiImageAdd } from 'react-icons/bi';
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Authentication from '~/functions/Authentication.jsx';
import MessageUser from '~/components/MessagePage/MessageUser';

import io from 'socket.io-client';
import TimeUp from '~/components/TimeUp';
import Message from '~/components/MessagePage/Message';

const socket = io('http://localhost:8080');

const cx = classNames.bind(style);
function Chat() {
    // Khai báo state
    const [userLogin,setUserLogin] = useState();
    const [listFriend,setlistFriend] = useState([]);
    const [room, setRoom] = useState('');
    const [choosenFriend, setChoosenFriend] = useState();
    const [messages, setMessages] = useState([]);
    const [inputMess, setInputMess] = useState('');
    
    
    //Xác thực người dùng để lấy thông tin đăng nhập 
    // Và sau đó lấy luôn danh sách bạn bè   
    useEffect( ()  =>  {
         async function getUserLogin() {
            const dataUserLogin = await Authentication();
            if (dataUserLogin === 0) {
                console.log('Cần login lại');
            }else{ 
                const dataListFriend = await axios.get(`http://localhost:8080/friend/getListFriend/${dataUserLogin.id}`)
                setUserLogin(dataUserLogin)
                setlistFriend(dataListFriend.data);               
            }   
         }

         getUserLogin();
    },[])
    
    // Nhận dữ liệu tin nhắn thông qua socket
    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setMessages((prev) => [...prev, message]);
        });
        return () => {
            socket.off('receiveMessage');
        }
    }, [room]);
  

    //Chọn bạn , lấy phòng , lấy message
    const handleChooseFriend  = async (friend) => {
        console.log(friend);
        setRoom(friend.room);
        setChoosenFriend(friend);

        socket.emit('join_room', {roomId: friend.room, userId: userLogin.id});

        // Lấy dữ liệu tin nhắn
        axios.get(`http://localhost:8080/messages/getmessagebyroom`,{
        params: { room: friend.room }
        })
        .then(response => {
            if (response.data.length > 0) {
                // Set lại tin nhắn của phòng mới
                setMessages(response.data);
            }else{
                setMessages([])
                console.log('Tài khoản này không có dữ liệu tin nhắn');
            }
        })
        .catch(error => {
            console.log('Lỗi hệ thống', error);
        })
    }
    
    
    //Xử lý gửi tin nhắn
    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log('nhấn gửi: dòng 88');

        // formData
        const padload = {
            messageContent: inputMess,
            receiverId: choosenFriend.id,
            senderId: userLogin.id,
            room: room
        }
        // Phát tín hiệu gửi tin 
        socket.emit('sendMessage',padload)
        // setInput lại rỗng
        setInputMess('');
    }   
 
    // hàm xử lí gửi vị trí  
    // const [messages, setMessages] = useState([]);
    const [location, setLocation] = useState('')
    console.log(location);
    
    const handleLocation = async () => {

        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation(`https://www.google.com/maps?q=${latitude},${longitude}`)
                    },
                    (error) => {
                        alert("Không thể lấy vị trí: " + error.message);
                    }
                );
            } else {
                alert("Trình duyệt của bạn không hỗ trợ Geolocation!");
            }
            // hàm gửi tin nhắn 
            const padload = {
                senderId: userLogin.id,
                receiverId: choosenFriend.id, // lấy id người dùng khi click vào 
                messageContent: location,
                room: room,
                
            }
            // phát sự kiện
            socket.emit('sendMessage',padload)
            // setMessages((preMess) => [...preMess, response.data])
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            

            alert('Có lỗi xảy ra khi gửi tin nhắn.');
        }

    };

     

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list_chat')}>
                <div className={cx('title_chat')}>Tin nhắn</div>

                {listFriend.map(friend => (
                    <div className="friendItem" key={friend.id} onClick={() =>  handleChooseFriend(friend)}>
                        <MessageUser  friend={friend}/>
                    </div>
                ))}
                
            </div>
            {room ? 
            (<div className={cx('chat')} >
                <div className={cx('header_chat')}>
                    <div className={cx('div_avatar')}>
                        <Avatar
                            sx={{ width: 60, height: 60 }}
                            className={cx('avatar')}
                            src={`http://localhost:8080/uploads/${choosenFriend.avatar}`}
                            alt='Avartar'
                        />
                    </div>
                    <div className={cx('wr_user_name')}>
                        <span className={cx('user_name')}>{choosenFriend.name}</span>
                        <br />
                        <span className={cx('span_time_onl')}>Hoạt động 6 giờ trước</span>
                    </div>
                </div>

                <div className={cx('content_mess')}>
                    
                    {messages.map((item) => 
                        item.sender_id === userLogin.id ? (
                            <Message myMess data={item}/>
                        ) : (
                            <Message friendMess data={item}/>
                        )
                        
                    )}
                </div>
                <div className={cx('wr_send_mess')}>
                    
                        <form onSubmit={handleSendMessage}  className={cx('wr_input_mess')} >
                            <input
                                value={inputMess}
                                onChange={(e) => setInputMess(e.target.value)}
                                type="text"
                                placeholder="Nhập tin nhắn.."
                            />

                            <div className={cx('wr_inp_img')}>
                                <input type="file" className={cx('inp_img')} />
                                <label>
                                    <BiImageAdd className={cx('img_icon')} />
                                </label>
                            </div>
                            
                            <button className={cx('btnSendMess')}  disabled={!inputMess.trim()}>Gửi</button>
                            
                        </form>
                        <button className={cx('iconLocation')} onClick={handleLocation}>
                                <FaMapMarkerAlt />
                        </button>
                        
                    
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
