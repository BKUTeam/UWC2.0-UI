import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);
function MenuItem({ item, onClick }) {
    return (
        <div className={cx('menu-item-wrapper')}>
            <div className={cx('menu-item')} onClick={() => onClick(item)}>
                {item.title}
            </div>
        </div>
    );
}
export default MenuItem;
