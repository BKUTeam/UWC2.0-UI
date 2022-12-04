import classNames from 'classnames/bind';
import { Map } from '~/components/Map';
import styles from '~/components/GlobalStyles/GlobalStyles.module.scss';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Header from '~/components/Header/Header';
import RightSideBar from '~/components/RightSideBar/index';
import { routeData as rData, markerData as mData } from '~/components/Map/data';
const cx = classNames.bind(styles);
function App() {
    const [routeData, setRouteData] = useState([]);
    const [markerData, setMarkerData] = useState([]);
    const [sidebar, setSidebar] = useState(false);

    function handleSelect() {
        setSidebar(sidebar => !sidebar);
        console.log(sidebar);
    }

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
                <div className={cx('header')}>{<Header handleSelect={handleSelect}/>}</div>
                <div className={cx('sidenav', 'right-sidenav')}>
                    <RightSideBar sidebar={sidebar}/>
                </div>
                <div className={cx('main-content')}>
                    <Map routeData={routeData} markerData={markerData} />
                </div>
                <div className={cx('footer')}>Footer</div>
            </div>
        </div>
    );
}

export default App;
