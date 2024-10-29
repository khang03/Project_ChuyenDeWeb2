import { BiXCircle, BiImageAdd, BiHeart, BiMessageRounded, BiShare, BiSolidHeart } from 'react-icons/bi';

import classNames from 'classnames/bind';
import style from './Home.module.scss';
import { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Home() {
    console.log('ressss.....');
    
    const cx = classNames.bind(style);
    //Lấy dữ liệu user
    const [user, setUser] = useState([])


    
        const getUser = async () => {
        try {
            const reponse = await axios.get('http://localhost:8080/users')
            setUser(reponse.data)

            

        }catch(e){
            console.log(e.message);
            
        }
        }



    useEffect(() => {
        getUser()

    }, [])




    //-----------Xử lí click render ra cửa sổ up bài viết--------------------//
    const btn = useRef();

    
    const [btnUpLoad, setBtnUpLoad] = useState(false);
  
    const handleUpLoad = () => {
        
        setBtnUpLoad(true);
    };

    const unrender = () => {
        setBtnUpLoad(false);
    };

    //Render image khi nhập từ input
    const [imageRender, setImageRender] = useState();

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];

        //Lấy link ảnh bằng cách đặt một thuộc tính
        file.preview = URL.createObjectURL(file);
        setImageRender(file);
        console.log(URL.createObjectURL(file));
    };

    //Xử lí nút like bài viết
    const [like, setLike] = useState();
    const [countLike, setCountLike] = useState(0);
    const handleLike = () => {
        setLike(true);
        if(like){
            setCountLike(countLike - 1);
        }
        else{
            setCountLike(countLike + 1);
        }
        setLike(!like)
    };

    return (
        <Fragment>
            <div className={cx('wrapper')} style={{ height: '1000px' }}>
                <div className={cx('wr_startus')}>
                    <div className={cx('img_startus')}>
                        <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6" />
                    </div>
                    <div className={cx('des_startus')}>
                        <input placeholder="Có gì hot?" onClick={handleUpLoad}/>
                    </div>
                    <div className={cx('btn_upl_stt')}>
                        <button onClick={handleUpLoad} ref={btn} className={cx('btn_upload')}>
                            Đăng
                        </button>
                    </div>

                    {/* Xử lí render info post */}
                    {btnUpLoad && (
                        <div className={cx('wr_position_up_post')}>
                            <div className={cx('relative_wr')}>
                                <div className={cx('position_wr_add_post')}>
                                    <div className={cx('wr_startus')}>
                                        <div className={cx('img_startus')}>
                                            <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6" />
                                        </div>
                                        <div className={cx('des_startus')}>
                                            <div className={cx('my_user_id')}>user_id</div>
                                            <input placeholder="Có gì hot?" />
                                            <div className={cx('wr_inp_img')}>
                                                <input
                                                    onChange={handlePreviewImage}
                                                    type="file"
                                                    className={cx('inp_img')}
                                                />
                                                <label>
                                                    <BiImageAdd className={cx('img_icon')} />
                                                </label>
                                            </div>
                                        </div>

                                        {/* click vào button này sẽ tắt màn hình render */}
                                        <div className={cx('btn_upl_stt')}>
                                            <button className={cx('btn_turn_off_post')} onClick={unrender}>
                                                <BiXCircle />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('info_render')}>
                                        <div className={cx('img_render')}>
                                            {imageRender && (
                                                <img
                                                    src={imageRender.preview}
                                                    alt=""
                                                    style={{ width: 'auto', height: 100, borderRadius: '15px' }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className={cx('wr_btn_up')}>
                                        <button className={cx('up_post')}>Đăng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {user.map(item => (
                    <div className={cx('post')}>
                    <div className={cx('wr_startus_post')}>
                        <div className={cx('img_startus')}>
                            <img src={item.avatar}/>
                        </div>
                        <div className={cx('wr_des_post')}>
                            <div className={cx('user_id')}>{item.username}</div>
                            <div className={cx('des_post')}>
                                <p>
                                    Mô tả của bài viết ở đâysaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa
                                    asdawdasdawdw
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wr_image_post')}>
                        <img
                            className={cx('image_post')}
                            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                        />
                    </div>

                    <div className={cx('interact')}>
                        <button onClick={handleLike} className={cx('like')}>
                            {like ? <BiSolidHeart style={{color: 'red'}}/> : <BiHeart />}{' '}
                        </button>{' '}
                        <label>{countLike}</label>
                        <button className={cx('comment')}>
                            <BiMessageRounded />{' '}
                        </button>{' '}
                        <label>Comment</label>
                        <button className={cx('share')}>
                            <BiShare />
                        </button>{' '}
                        <label>Share</label>
                    </div>
                </div>
                ))}
                
                {/* <div className={cx('post')}>
                    <div className={cx('wr_startus_post')}>
                        <div className={cx('img_startus')}>
                            <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6" />
                        </div>
                        <div className={cx('wr_des_post')}>
                            <div className={cx('user_id')}>user_id</div>
                            <div className={cx('des_post')}>
                                <p>Mô tả của bài viết ở đâysaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa asdawdasdawdw</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wr_image_post')}>
                        <img
                            className={cx('image_post')}
                            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                        />
                    </div>

                    <div className={cx('interact')}>
                        <button className={cx('like')}><BiHeart /> </button> <label>Like</label>
                        <button className={cx('comment')}><BiMessageRounded /> </button> <label>Comment</label>
                        <button className={cx('share')}><BiShare /></button> <label>Share</label>
                    </div>
                </div>
                <div className={cx('post')}>
                    <div className={cx('wr_startus_post')}>
                        <div className={cx('img_startus')}>
                            <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6" />
                        </div>
                        <div className={cx('wr_des_post')}>
                            <div className={cx('user_id')}>user_id</div>
                            <div className={cx('des_post')}>
                                <p>Mô tả của bài viết ở đâysaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa asdawdasdawdw</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wr_image_post')}>
                        <img
                            className={cx('image_post')}
                            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                        />
                    </div>

                    <div className={cx('interact')}>
                        <button className={cx('like')}><BiHeart /> </button> <label>Like</label>
                        <button className={cx('comment')}><BiMessageRounded /> </button> <label>Comment</label>
                        <button className={cx('share')}><BiShare /></button> <label>Share</label>
                    </div>
                </div>
                <div className={cx('post')}>
                    <div className={cx('wr_startus_post')}>
                        <div className={cx('img_startus')}>
                            <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6" />
                        </div>
                        <div className={cx('wr_des_post')}>
                            <div className={cx('user_id')}>user_id</div>
                            <div className={cx('des_post')}>
                                <p>Mô tả của bài viết ở đâysaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa asdawdasdawdw</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wr_image_post')}>
                        <img
                            className={cx('image_post')}
                            src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/451342439_1545279516420145_664382896184158578_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtuooj7cntrEsyS3BI2qyHQrU2AFLPZpNCtTYAUs9mkzrpY2pD6_iv9FlZyhceycfj5e9SPg2qhA7bXxn-XCls&_nc_ohc=MmZ5MF3JLYYQ7kNvgHft24g&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AQjnXq8jnQH4TA9ys9-kvYX&oh=00_AYD4C1xmRYphJ_489MmztS-XieVXUbqUbbyVlBA5_48fCg&oe=671566A6"
                        />
                    </div>

                    <div className={cx('interact')}>
                        <button className={cx('like')}><BiHeart /> </button> <label>Like</label>
                        <button className={cx('comment')}><BiMessageRounded /> </button> <label>Comment</label>
                        <button className={cx('share')}><BiShare /></button> <label>Share</label>
                    </div>
                </div> */}
            </div>
        </Fragment>
    );
}

export default Home;
