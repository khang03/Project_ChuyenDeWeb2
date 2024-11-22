import classNames from 'classnames/bind';
import Header from '~/components/Layout/DefaultLayout/Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.module.scss'
import WrapperContent from './WrapperContent';
import UpLoadLayOut from './UpLoadLayOut';


function DefaultLayout({ children }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                
                <WrapperContent children={children}/>
                

                
            </div>
        </div>
    );
}

export default DefaultLayout;
