import classNames from "classnames/bind";
import { useState } from "react";
import style from './MessageUser.module.scss';
import { Avatar } from "@mui/material";
const cx = classNames.bind(style);

const MessageUser = ({friend}) => {

    
    console.log(friend);
    
    return (
        
            <div className={cx('user_chat')}>

                <div className={cx('div_avatar')}>
                    <Avatar sx={{ width: 60, height: 60 }} className={cx('avatar')} src={friend.avatar} />
                </div>
        
                <div className={cx('name_user')}>
                    <span className={cx('span_name_user')}>{friend.name}</span> <br />
                    <span className={cx('span_time_send_mess')}>Đã gửi 6 giờ trước</span>
                </div>
            </div>
       
    );
};

export default MessageUser;