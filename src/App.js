import classNames from 'classnames/bind';
import { Map } from '~/components/Map';
import styles from '~/components/GlobalStyles/GlobalStyles.module.scss';
import { useState, useEffect } from 'react';

import { routeData as rData, markerData as mData } from '~/components/Map/data';
const cx = classNames.bind(styles);
function App() {
    const [routeData, setRouteData] = useState([]);
    const [markerData, setMarkerData] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setRouteData(rData);
        }, 3000);
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setMarkerData(mData.features);
        }, 3000);
    }, []);

    return (
        <div className={cx('app')}>
            <div className={cx('sidenav', 'left-sidenav')}>Left sideNav</div>
            <div className={cx('content')}>
                <div className={cx('header')}>Header</div>
                <div className={cx('sidenav', 'right-sidenav')}>Right sideNav</div>
                <div className={cx('main-content')}>
                    <Map routeData={routeData} markerData={markerData} />
                </div>
                <div className={cx('footer')}>Footer</div>
            </div>
        </div>
    );
}

export default App;
