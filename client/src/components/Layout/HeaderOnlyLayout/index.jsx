import style from './HeaderOnlyLayout.module.scss';
import classNames from 'classnames/bind';
import Sidebar from './Sidebar';
import WrapperContent from './WrapperContent';

function HeaderOnlyLayout({ children }) {
    const cx = classNames.bind(style);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />

                <WrapperContent children={children} />
            </div>
        </div>
    );
}

export default HeaderOnlyLayout;
