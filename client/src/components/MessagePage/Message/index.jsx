import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { Avatar, Button, Menu, MenuItem, Fade } from '@mui/material';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const cx = classNames.bind(styles);
const socket = io('http://localhost:8080');

function Message({ myMess, friendMess, data }) {
    // Các biến state
    const [openMenus, setOpenMenus] = useState({});
    const [message, setMessage] = useState(data.retracted);
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

    // hàm xách nhận link goggle mad
    const isValidUrl = (string) => {
        try {
            new URL(string); // Sử dụng constructor URL để xác thực
            return true;
        } catch (error) {
            return false;
        }
    };

    // xử lý thu hồi tin nhắn
    const handleDeleteMess = () => {
        socket.emit('deleteMessage', { messageId: data.id });
    };
    console.log(data);
    useEffect(() => {
        socket.on('messageRetracted', (dataRes) => {
            if (dataRes.message_id === data.id) {
                setMessage(0); // Cập nhật trạng thái tin nhắn
            }
        });

        socket.on('retractError', ({ status, message }) => {
            console.error(`Lỗi ${status}: ${message}`);
            alert(`Không thể thu hồi tin nhắn: ${message}`);
        });

        // Cleanup khi component unmount
        return () => {
            socket.off('messageRetracted');
            // socket.off("retract-error");
        };
    }, []);

    return (
        <div>
            {myMess && (
                <div className={cx('my_mess')}>
                    <Button
                        id="fade-button"
                        aria-controls={openMenus[data.id] ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenus[data.id] ? 'true' : undefined}
                        onClick={(e) => handleClick(data.id, e)}
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
                        anchorEl={openMenus[data.id]}
                        open={Boolean(openMenus[data.id])}
                        onClose={() => handleClose(data.id)}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleDeleteMess}>Thu hồi tin nhắn</MenuItem>
                    </Menu>
                    <div className={cx('content_my_mess')}>
                        {message === 0 ? (
                            <p className={cx('retracted-message')}>Tin nhắn đã được thu hồi</p>
                        ) : isValidUrl(data.message_content) ? (
                            <a href={data.message_content} target="_blank" rel="noopener noreferrer">
                                {data.message_content}
                            </a>
                        ) : (
                            <p>{data.message_content}</p>
                        )}
                    </div>
                </div>
            )}

            {friendMess && (
                <div className={cx('user_mess')}>
                    <div className={cx('avatar_user_mess')}>
                        <Avatar src="https://th.bing.com/th/id/OIP.6nDu0p6RwW2arJTCOU2pCQHaDt?rs=1&pid=ImgDetMain" />
                    </div>
                    <div className={cx('content_user_mess')}>{data.message_content}</div>
                </div>
            )}
        </div>
    );
}

export default Message;
