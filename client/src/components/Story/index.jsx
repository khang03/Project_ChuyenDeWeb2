import classNames from 'classnames/bind';
import style from './Story.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, colors } from '@mui/material';
import { BiX } from 'react-icons/bi';
import TimeUp from '../TimeUp';
import { IoIosAddCircle } from 'react-icons/io';
import ModalStory from '../ModalStory';

const cx = classNames.bind(style);
function Story({ user }) {
    const [modalView, SetModalView] = useState(false);
    const [addStory, setAddStory] = useState(false)
    //Tạo useState lấy tất cả story
    const [story, setStory] = useState([]);
    const renderModalView = () => {
        SetModalView(true);
    };

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await axios.get('http://localhost:8080/stories');
                setStory(response.data.stories);
            } catch {
                console.log('Lỗi story');
            }
        };
        fetchStory();
    }, []);
    console.log(story);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('my_story')} onClick={() => setAddStory(true)}>
                <Avatar sx={{ width: 80, height: 80 }} src={user.avatar} />

                <p>Tin của bạn</p>
                <IoIosAddCircle className={cx('add_story')} />
                
            </div>
            {story.map((item) => (
                <>
                    <div className={cx('story')} onClick={renderModalView} key={item.id}>
                        <Avatar sx={{ width: 80, height: 80 }} src={item.oneUser.avatar} className={cx('avatar')} />
                        <p>{item.oneUser.username}</p>
                    </div>
                    {modalView && item.id && (
                        <div className={cx('wr_modal_view')}>
                            <div className={cx('wr_content_story')}>
                                <div className={cx('header_story')}>
                                    <Avatar
                                        sx={{ width: 40, height: 40 }}
                                        className={cx('avatar')}
                                        src={item.oneUser.avatar}
                                    />
                                    <div className={cx('username')}>
                                        <span>{item.oneUser.username}</span>
                                        <TimeUp className={cx('time')} time={item.createdAt} />
                                    </div>
                                    <div className={cx('close_modal')}>
                                        <button onClick={() => SetModalView(false)}>
                                            <BiX />
                                        </button>
                                    </div>
                                </div>
                                <div className={cx('wr_image')}>
                                    <img src={item.image_url} alt="" />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ))}
            {addStory && (
                    <ModalStory user={user} />
                )}
        </div>
    );
}

export default Story;
