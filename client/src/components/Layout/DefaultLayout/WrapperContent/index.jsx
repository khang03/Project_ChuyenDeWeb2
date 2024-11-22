import classNames from 'classnames/bind';

import styles from './WrapperContent.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);
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
