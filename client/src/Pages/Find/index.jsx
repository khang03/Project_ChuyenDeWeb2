import classNames from 'classnames/bind';
import style from './Find.module.scss';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
// const arr_user = [
//     { user_id: 1, user_name: 'Nguyễn An', content: 'Đã thích bài viết của bạn' },
//     { user_id: 2, user_name: 'Trần Bình', content: 'Đã thích bài viết của bạn' },
//     { user_id: 3, user_name: 'Lê Cường', content: 'Đã thích bài viết của bạn' },
//     { user_id: 4, user_name: 'Phạm Duy', content: 'Đã thích bài viết của bạn' },
//     { user_id: 5, user_name: 'Đỗ Hà', content: 'Đã thích bài viết của bạn' },
//     { user_id: 6, user_name: 'Vũ Hải', content: 'Đã thích bài viết của bạn' },
//     { user_id: 7, user_name: 'Bùi Kiên', content: 'Đã thích bài viết của bạn' },
//     { user_id: 8, user_name: 'Ngô Lan', content: 'Đã thích bài viết của bạn' },
//     { user_id: 9, user_name: 'Dương Mai', content: 'Đã thích bài viết của bạn' },
//     { user_id: 10, user_name: 'Lý Nam', content: 'Đã thích bài viết của bạn' },
// ];



function Find() {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     setData([...arr_user]);
    // }, []);

    const [username , setUsername] = useState(''); //lưu giá trị nhập vào mảng 
    const [users , setUsers] = useState([]);  // lưu keeeesrt quả tiềm kiếm 
  
        // useEffect(() => {
        //     if(username.length === 0){
        //         setUsers([]);
        //         return;
        //     }
        // })
        
        const fetchUsers = async () => {
            const response = await axios.get(`http://localhost:8080/users/search/${username}`);
            setUsers(response.data);

        };


    

    return (
        <div className={cx('wrapper')}>
            <div className={cx('head_inp')}>
                <div className={cx('wr_inp')}>
                    <div className={cx('wr_icon_search')}>
                        <BiSearch />
                    </div>
                    <div className={cx('wr_search')}>
                        <input 
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Nhập user name" />
                    <button onClick={fetchUsers}>Tìm Kiếm </button>
                    </div>
                </div>
            </div>
            <div className={cx('tittle_result')}>
                <span>Kết quả</span>
            </div>
            

            <div className={cx('wr_result')}>
                {users.map((user) => (
                    <Card sx={{ my: 2, p: 2 }} variant="elevation">
                        <div className={cx('result')}>
                            <div className={cx('wr_img')}>
                                <img
                                    src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                                    alt=""
                                />
                            </div>
                            <div className={cx('wr_info_user_find')}>
                            
                                <Link to={`/ProfileOther/${user.id}`}>
                                <p className={cx('user_id')}>{user.username}</p>
                                <p className={cx('user_name')}>{user.name}</p>
                                <p>{user.content}.</p>
                                </Link>
            
                            </div>
                        </div>
                    </Card>
                ))}
                {/* 
                <div className={cx('result')}>
                    <div className={cx('wr_img')}>
                        <img
                            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                            alt=""
                        />
                    </div>
                    <div className={cx('wr_info_user_find')}>
                        <p className={cx('user_id')}>user_id</p>
                        <p className={cx('user_name')}>user_name</p>
                    </div>
                </div>
                <div className={cx('result')}>
                    <div className={cx('wr_img')}>
                        <img
                            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                            alt=""
                        />
                    </div>
                    <div className={cx('wr_info_user_find')}>
                        <p className={cx('user_id')}>user_id</p>
                        <p className={cx('user_name')}>user_name</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}


export default Find;
