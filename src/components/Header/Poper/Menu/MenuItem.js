import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { MapContext } from '~/App';
const cx = classNames.bind(styles);
function MenuItem({ item }) {
    const mapContext = useContext(MapContext);
    const handelChangeEmployee = () => {
        mapContext.setCurrentView(item);
    };
    return (
        <div className={cx('menu-item-wrapper')}>
            <div className={cx('menu-item')} onClick={handelChangeEmployee}>
                {item.title}
            </div>
        </div>
    );
}
export default MenuItem;
