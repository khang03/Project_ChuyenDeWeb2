import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { BiHeart, BiSearch, BiHomeAlt2, BiUser, BiSolidHeart, BiSolidSearch, BiSolidUser } from 'react-icons/bi';

const cx = classNames.bind(styles);
function Sidebar() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isFindPage = location.pathname === '/Find';
    const isNotiPage = location.pathname === '/Notification';
    const isProfile = location.pathname === '/Profile';

    return (
        <aside className={cx('sidebar')}>
            <ul className={cx('list_nav')}>
                <li className={cx('item_nav')}>
                    <Link to="/">{isHomePage ? <BiSolidHeart /> : <BiHeart />}</Link>
                </li>

                <li className={cx('item_nav')}>
                    <Link to="/Find">
                        {isFindPage ? <BiSolidSearch /> :  <BiSearch />}
                    </Link>
                </li>
                <li className={cx('item_nav')}>
                    <Link to="/Notification">
                    {isNotiPage ? <BiSolidHeart /> : <BiHeart />}
                    </Link>
                </li>
                <li className={cx('item_nav')}>
                    <Link to="/Profile">
                       {isProfile ? <BiSolidUser /> : <BiUser />}
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
