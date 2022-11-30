import classNames from 'classnames/bind';
import { Map } from '~/components/Map';
import styles from '~/components/GlobalStyles/GlobalStyles.module.scss';
const cx = classNames.bind(styles);
function App() {
    return (
        <div className={cx('app')}>
            <div className={cx('header')}>Header</div>
            <div className={cx('content')}>
                <div className={cx('sidenav', 'left-sidenav')}>Left sideNav</div>
                <div className={cx('main-content')}>
                    <Map />
                </div>
                <div className={cx('sidenav', 'right-sidenav')}>Right sideNav</div>
            </div>
            <div className={cx('footer')}>Footer</div>
        </div>
    );
}

export default App;
