// Reactjs
import { BiImageAdd, BiXCircle } from 'react-icons/bi';
import style from './ModalPost.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const cx = classNames.bind(style);
    
function ModalPost({ closeModal }) {
    // Khai báo State và Ref (khai báo biến ở đây)
    const refForm = useRef();
    const [txtDesPost, setTxtDesPost] = useState('');
    const [image, setImage] = useState({imgPreview: [], imgData: []});
    const [messageErr, setMessageErr] = useState('');
    let maxCharacter = 500;
    
    useEffect(() => {
        // cleanup function
        return () => {      
            image.imgPreview.map(item => URL.revokeObjectURL(item));     
        }

    }, [image])

    // handle Image
    const handlePreviewImage = (e) => {
        const maxFile = 4 ;
        const files = Array.from(e.target.files);

        if (files.length > maxFile) {
            setMessageErr('Chỉ up được 4 file thôi nhé các anh hacker!');
            return;
        }
        const imgPreview = files.map((file) => URL.createObjectURL(file));
        setImage({imgPreview,imgData:files});
        
    };
    
    // handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        
        image.imgData.forEach((image) => {
            formData.append('images',image)
        });

        formData.append("contentPost",txtDesPost);
        formData.append("idUser",1);
 
        // Gửi dữ liệu và nhận phản hồi
        axios.post('http://localhost:8080/posts/store',formData)
            .then(response => {
                if (response.status === 201) {
                    console.log(response.data);  
                    closeModal();
                    toast(response.data.message,{position: "bottom-center"});
                }
            })
            .catch(error => {                                  
                if (error.response) {
                    toast.error(error.response.data.message,{position: "bottom-center"});
                }
        })    
    }
  
    return (
        <div className={cx('wr_position_up_post')}>
            <div className={cx('relative_wr')}>
                <div className={cx('position_wr_add_post')}>
                    <div className={cx('wr_startus')}>
                        <div className={cx('img_startus')}>
                            <img alt="" src="" />
                        </div>
                        <div className={cx('des_startus')}>
                            <div className={cx('my_user_id')}>user_id - {maxCharacter - txtDesPost.length}</div>
                            <form ref={refForm} onSubmit={handleSubmit} encType="multipart/form-data">
                                <textarea
                                    className={cx('txt_des')}
                                    value={txtDesPost}
                                    onChange={(e) => setTxtDesPost(e.target.value)}
                                    rows={4} // Đặt số dòng hiển thị ban đầu
                                    cols={50} // Đặt độ rộng của textarea
                                    placeholder="Có gì hot...?"
                                    maxLength={500}
                                />

                                <div className={cx('wr_inp_img')}>
                                    <input
                                        accept='image/*'                                       
                                        type="file" 
                                        multiple
                                        name='imgPost'
                                        className={cx('inp_img')} 
                                        onChange={handlePreviewImage}
                                    />
                                    <label>
                                        <BiImageAdd className={cx('img_icon')} />
                                    </label>
                                </div>
                                
                                <div className={cx('wr_btn_upl_stt')}>
                                    <button type='submit' className={cx('btn_upload')}>Đăng</button>
                                </div>
                            </form>
                        </div>

                        {/* click vào button này sẽ tắt màn hình render */}
                        <div className={cx('btn_upl_stt')}>
                            <button className={cx('btn_turn_off_post')} onClick={closeModal}>
                                <BiXCircle />
                            </button>
                        </div>
                    </div>
                    
                    <div className={cx('info_render')}>
                        <div className={cx('img_render')}>
   
                            {image.imgPreview.map((img,index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt=""
                                    style={{ width: 'auto', height: 100, borderRadius: '15px' }}
                                />
                            ))}

                        </div>
                    </div>
                    
                    
                    <div className={cx('box_error')}>{messageErr}</div>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default ModalPost;
