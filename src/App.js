import classNames from 'classnames/bind';
import { Map } from '~/components/Map';
import styles from '~/components/GlobalStyles/GlobalStyles.module.scss';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Header from '~/components/Header/Header';
import RightSideBar from '~/components/RightSideBar/Collector';
import { routeData as rData, markerData as mData } from '~/components/Map/data';
const cx = classNames.bind(styles);
function App() {
    const [routeData, setRouteData] = useState([]);
    const [mcpInfo, setmcpInfo] = useState([]);
    const [depotInfo, setdepotInfo] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/resources/mcps/')
            .then((res) => res.json())
            .then((data) => {
                setmcpInfo(data);
            });
        fetch('http://localhost:5000/api/resources/depots/')
            .then((res) => res.json())
            .then((data) => {
                setdepotInfo(data);
            });
    }, []);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setMarkerData(mData.features);
    //     }, 3000);
    // }, []);

    return (
        <div className={cx('app')}>
            <div className={cx('sidenav', 'left-sidenav')}>Left sideNav</div>
            <div className={cx('content')}>
                <div className={cx('header')}>{<Header />}</div>
                <div className={cx('sidenav', 'right-sidenav')}>
                    <RightSideBar />
                </div>
                <div className={cx('main-content')}>
                    <Map routeData={routeData} markerData={[...mcpInfo, ...depotInfo]} />
                </div>
                <div className={cx('footer')}>Footer</div>
            </div>
        </div>
    );
}

export default App;
