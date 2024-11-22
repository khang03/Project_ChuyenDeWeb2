import classNames from 'classnames/bind';
import style from './Notification.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TimeUp from '~/components/TimeUp';

function Notification() {
    const cx = classNames.bind(style);

    const [notifications, setNotifications] = useState([]);
    //Lấy dữ liệu id người dùng khi đăng nhập
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState({});

    //Lấy tất cả user đã bình luận
    const [userComment, setUserComment] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                setUserComment(response.data);
            } catch (err) {
                setError('Không thể lấy thông tin người dùng');
            }
        };
        fetchUser();
    }, []);
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
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/notification/${userId.id}`);
                const sortNotification = response.data.notification.sort((a, b) => b.id - a.id);
                setNotifications(sortNotification);
                console.log(sortNotification);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [userId.id]);

        const fetchFrShip =  (id1, id2) => {
            try{
                  axios.put(`http://localhost:8080/friend/${id1}/${id2}`,{
                    
                    status: 1,
                  })
                  
            }catch{
                console.log("lỗi");
                
            }
        }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('tittle_page')}>Thông báo</div>
            {notifications.map((item) => (
                item.role === 2 ? (
                    < div className = { cx('wr_notification') } key = { item.id } >
                    {
                        userComment.map(user =>
                            user.id === item.user_id_send ? (
                                <div className={cx('wr_notification')} key={user.id}>
                                    <div className={cx('wr_img')}>
                                        <img className={cx('img_user')} src={user.avatar} alt="" />
                                    </div>
                                    <div className={cx('content_notification')}>
                                        <div className={cx('user_id')}>
                                            <div className={cx('id')}>{user.username}</div>
                                            <div className={cx('time')}><TimeUp time={item.createdAt} /></div>
                                        </div>
                                        <div className={cx('content')}>{item.message}</div>
                                    </div>
                                    <button style={{color: "red"}}>Hủy</button>

                                    <button onClick={() => fetchFrShip(user.id, item.user_id)}>Chấp nhận</button>
                                </div>
                            ) : (
                                <></>
                            ),
                        )
                    }
                        </div>
    
                ): item.role === 0 && (
                    < div className = { cx('wr_notification') } key = { item.id } >
                    {
                        userComment.map(user =>
                            user.id === item.user_id_send ? (
                                <div className={cx('wr_notification')} key={user.id}>
                                    <div className={cx('wr_img')}>
                                        <img className={cx('img_user')} src={user.avatar} alt="" />
                                    </div>
                                    <div className={cx('content_notification')}>
                                        <div className={cx('user_id')}>
                                            <div className={cx('id')}>{user.username}</div>
                                            <div className={cx('time')}><TimeUp time={item.createdAt} /></div>
                                        </div>
                                        <div className={cx('content')}>{item.message}</div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            ),
                        )
                    }
                        </div>
                )

          

    ))
}
        </div >
    );
}

export default Notification;
