// Reactjs
import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

// My Source
import style from './Home.module.scss';
import PostUser from '~/components/PostUser';
import ModalPost from '~/components/ModalPost';

const cx = classNames.bind(style);

function Home() {
    // Khai báo State và Ref (khai báo biến ở đây)
    const [showModalPost,setShowModalPost] = useState(false);
    const [dataPosts, setDataPost] = useState([]);
    
    // useEffect(() => {    
    //     axios.get('http://localhost:8080/users')
    //         .then(response => setDataPost(response.data))
    //         .catch(error => console.log('Không lấy được dữ liệu',error));
    // },[])

    
    
    return (
        <Fragment>
          
            <div className={cx('wrapper')} style={{ height: '1000px' }}>
                <div className={cx('wr_startus')}>
                    <div className={cx('img_startus')}>
                        <img alt='' src="http://localhost:8080/uploads\1730603425289-images.jpg" />
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
                    {showModalPost && (<ModalPost closeModal={() => setShowModalPost(false)}  /> )}     

                </div>

                {/* render ra các bài post */}
                {dataPosts.map(dataItem => (     
                        <div className="post" key={dataItem.id}>
                            <PostUser dataItem={dataItem} />
                        </div>                       
                ))}
    
            </div>
        </Fragment>
    );
}

export default Home;
