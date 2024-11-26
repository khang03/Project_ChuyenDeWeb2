import classNames from 'classnames/bind';
import styles from './SearchResultMessage.module.scss';

const cx = classNames.bind(styles);

function SearchResultMessage({data}) {
    console.log(data);
    return (
        // Ngày mai css tiếp giao diện
        <div className={cx('resultSearch')}>
            {data.length > 0 ? (
                data.map(item => {
                    return(
                        <div className={cx('haveResult')}>
                            <div className="avatar">
                                <img src="" alt="avatar" width={'100px'} />
                            </div>
                            <div className="content">
                                
                                <span className={cx('message')}>{item.message_content}</span>
                            </div>
                           
                        </div>
                        
                    )
                })
            ) : (
                <div className="none">
                    <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Nhập kết quả tìm kiếm</h3>
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>Nhập nội dung cần tìm trong hội thoại</p>
                </div>
            )}
        </div>
    );
}

export default SearchResultMessage;
