import classNames from 'classnames/bind';
import style from './ModalReportPost.module.scss';
import axios from 'axios';

const cx = classNames.bind(style);
function ModalReportPost({ user, item, setModalreport }) {
    //Báo cáo vi phạm nội dung
    const reportContent = () => {
        try {
            axios.post('http://localhost:8080/notification/', {
                user_id: item.user_id,
                message: 'Nội dung và hình ảnh không phù hợp',
                post_id: item.id,
                user_id_send: user.id,
                role: 1,
            });
            setModalreport(null);
        } catch {
            console.log('không báo cáo được');
        }
    };

    //Báo cáo vi phạm bản quyền
    const reportCopyRight = () => {
        try {
            axios.post('http://localhost:8080/notification/', {
                user_id: item.user_id,
                message: 'Hình ảnh và nội dung vi phạm bản quyền',
                post_id: item.id,
                user_id_send: user.id,
                role: 1,
            });
            setModalreport(null);
        } catch {
            console.log('không báo cáo được');
        }
    };
    const handleCloseModal = () => {
        setModalreport(null);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wr_modal')}>
                <div className={cx('modal_report_category')}>
                    <div className={cx('header')}>
                        <div className={cx('title')}>Báo cáo bài viết</div>
                        <div onClick={handleCloseModal} className={cx('close')}>X</div>
                    </div>

                    <div onClick={reportContent} className={cx('content_report')}>
                        Nội dung không phù hợp
                    </div>
                    <div onClick={reportCopyRight} className={cx('content_report')}>
                        Vi phạm bản quyền
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalReportPost;
