

import style from './WrapperContent.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(style)
function WrapperContent({ children }) {
    return ( 
        <div className={cx('wrapper-content')}>
            <div  className={cx('div-content')}>
                {children}
            </div>
        </div>
     );
}

export default WrapperContent;