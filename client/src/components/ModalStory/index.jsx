import { useEffect, useRef, useState } from 'react';
import style from './ModalStory.module.scss';
import classNames from 'classnames/bind';

import { BiImageAdd, BiXCircle } from 'react-icons/bi';
import { Avatar } from '@mui/material';
import axios from 'axios';

const cx = classNames.bind(style);
function ModalStory({
    isActiveAdd,
    isActiveEdit,
    nameModal = 'Name Modal',
    closeModal,
    imgs,
    txt,
    idPost,
    idUser,
    user,
}) {
    // Khai báo State và Ref (khai báo biến ở đây)
    const refForm = useRef();
    const [txtDesPost, setTxtDesPost] = useState('');
    const [image, setImage] = useState({ imgPreview: [], imgData: [] });
    const [messageErr, setMessageErr] = useState('');
    const [imageStory, setImageStory] = useState(null);
    let maxCharacter = 500;

    // Xóa ảnh
    useEffect(() => {
        // cleanup function
        return () => {
            image.imgPreview.map((item) => URL.revokeObjectURL(item));
        };
    }, [image]);

    // Xóa ảnh không muốn chọn
    const handleDeleteImage = (index) => {
        // Tạo một bản sao của imgPreview và imgData để tránh thay đổi trực tiếp vào state
        const newImgPreview = [...image.imgPreview];
        const newImgData = [...image.imgData];

        // Xóa ảnh theo index
        newImgPreview.splice(index, 1);
        newImgData.splice(index, 1);

        // Cập nhật lại state
        setImage({ imgPreview: newImgPreview, imgData: newImgData });
    };
    useEffect(() => {
        const storedImage = localStorage.getItem('imagePreview');
        if (storedImage) {
            setImageStory(storedImage); // Đặt lại ảnh từ localStorage nếu có
        }
    }, []);
    // localStorage.removeItem('imagePreview')
    console.log(imageStory);
    
    // Xử lý ảnh xem trước
    const handlePreviewImage = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Image = reader.result;
                setImageStory(base64Image);
                // Lưu vào localStorage
                localStorage.setItem('imagePreview', base64Image);
            };

            reader.readAsDataURL(file); // Đọc file dưới dạng base64
        } else {
            alert('Vui lòng chọn một file ảnh!');
        }
    };

    const handleSubmitStory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/stories/store', {
                content: txtDesPost,
                image_url: imageStory,
                user_id: user.id,
            });
        } catch {
            console.log('lỗi');
        }
    };

    return (
        <div className={cx('wr_position_up_post')}>
            <div className={cx('relative_wr')}>
                <div className={cx('position_wr_add_post')}>
                    <div className={cx('wr_title')}>
                        <h3 className={cx('title')}>Đăng tin</h3>
                        {/* click vào button này sẽ tắt màn hình render */}
                        <div className={cx('btn_upl_stt')}>
                            <button className={cx('btn_turn_off_post')} onClick={closeModal}>
                                <BiXCircle />
                            </button>
                        </div>
                    </div>
                    <div className={cx('wr_startus')}>
                        <div className={cx('img_startus')}>
                            <Avatar sx={{ width: 60, height: 60 }} className={cx('avatar')} src={user.avatar} />
                        </div>
                        <div className={cx('des_startus')}>
                            <div className={cx('my_user_id')}>
                                {user.username} - {maxCharacter - txtDesPost.length}
                            </div>
                            <form onSubmit={handleSubmitStory}>
                                <textarea
                                    className={cx('txt_des')}
                                    value={txtDesPost}
                                    onChange={(e) => setTxtDesPost(e.target.value)}
                                    rows={4} // Đặt số dòng hiển thị ban đầu
                                    cols={50} // Đặt độ rộng của textarea
                                    placeholder="Nhập cảm nghĩ.."
                                    maxLength={500}
                                />

                                <div className={cx('wr_inp_img')}>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        multiple
                                        name="imgPost"
                                        className={cx('inp_img')}
                                        onChange={handlePreviewImage}
                                    />
                                    <label>
                                        <BiImageAdd className={cx('img_icon')} />
                                    </label>
                                </div>

                                <div className={cx('wr_btn_upl_stt')}>
                                    <button name="action" value="add" type="submit" className={cx('btn_upload')}>
                                        Đăng
                                    </button>

                                    {/* Hôm qua làm tới đây để biết modal sửa hay đăng , làm tiếp value = add ,edit thì xử lý API (nhớ xóa) */}
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={cx('info_render')}>
                        <div className={cx('img_render')}>
                            {image.imgPreview.map((img, index) => (
                                <div className={cx('wr_img')} key={index}>
                                    <img
                                        key={index}
                                        src={
                                            typeof img === 'string'
                                                ? img
                                                : `http://localhost:8080/uploads/${img.img_url}`
                                        }
                                        alt=""
                                        style={{ width: 'auto', height: 100, borderRadius: '15px' }}
                                    />
                                    <button onClick={() => handleDeleteImage(index)}>X</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={cx('box_error')}>{messageErr}</div>
                </div>
            </div>
        </div>
    );
}
export default ModalStory;
