// Reactjs
import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

// My Source
import style from './Home.module.scss';
import PostUser from '~/components/PostUser';
import ModalPost from '~/components/ModalPost';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Home() {
    // Khai báo State và Ref (khai báo biến ở đây)
    const [showModalPost, setShowModalPost] = useState(false);

    const [posts, setPosts] = useState([]);

    //Tạo biến xét user id khi lấy token
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    //
    const navigate = useNavigate();

    //Lấy dữ liệu bài viết
    useEffect(() => {
        axios
            .get('http://localhost:8080/posts')
            .then((response) => setPosts(response.data))
            .catch((error) => console.log('Không lấy được dữ liệu', error));
    }, []);
    // console.log(dataUser);

    //Lấy token người dùng
    const token = localStorage.getItem('authToken');

    //Lấy dữ liệu userId khi đăng nhập vào
    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                navigate('/login'); // Nếu không có token, điều hướng về trang login
                return;
            }

            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (err) {
                    setError('Không thể lấy thông tin người dùng');
                }
            } else {
                setError('Bạn chưa đăng nhập');
            }
        };
        fetchUserData();
    }, []);

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                {user && (
                    <div className={cx('wr_startus')} >
                        <div className={cx('img_startus')}>
                            <img alt="" src={user.avatar} />
                        </div>
                        <div className={cx('des_startus')}>
                            <input placeholder="Có gì hot?" />
                        </div>
                        <div className={cx('btn_upl_stt')}>
                            <button onClick={() => setShowModalPost(!showModalPost)} className={cx('btn_upload')}>
                                Đăng
                            </button>
                        </div>

                        {/* Xử lí render info post */}
                        {showModalPost && <ModalPost user={user} closeModal={() => setShowModalPost(false)} isActiveAdd nameModal='Đăng bài viết' idUser={user.id}/>}
                    </div>
                )}

                {/* Render component Post ra màn hình */}
                {posts.map((item, index) => (
                    // console.log(item)
                    <PostUser setPosts={setPosts} user={user} key={item.id} item={item} index={index} />
                ))}
            </div>
        </Fragment>
    );
}

export default Home;
