import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
function Header() {
    const cx = classNames.bind(styles);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link className="home_page" to="/">
                    Trang chủ
                </Link>
                <span>Dành cho bạn</span>
                <Link className="home_page" to="/Login">
                    <span>Đăng Xuất</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
