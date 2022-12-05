import classNames from 'classnames/bind';
import { Map } from '~/components/Map';
import styles from '~/components/GlobalStyles/GlobalStyles.module.scss';
import { createContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { dataFetch } from './utils/DataFetch';

import Header from '~/components/Header/Header';
import RightSideBar from '~/components/RightSideBar/Collector';

export const MapContext = createContext();

const cx = classNames.bind(styles);
function App() {
    const [routeData, setRouteData] = useState([]);
    const [mcpInfo, setmcpInfo] = useState([]);
    const [depotInfo, setdepotInfo] = useState([]);
    const [collectors, setCollectors] = useState([]);
    useEffect(() => {
        dataFetch('http://localhost:5000/api/resources/mcps/', setmcpInfo);
        dataFetch('http://localhost:5000/api/resources/depots/', setdepotInfo);
        dataFetch('http://localhost:5000/api/resources/collectors', setCollectors);
    }, []);
    return (
        <div className={cx('app')}>
            <div className={cx('header')}>{<Header />}</div>
            <div className={cx('sidenav', 'left-sidenav')}>Left sideNav</div>
            <div className={cx('content')}>
                <div className={cx('main-content')}>
                    <MapContext.Provider value={{ routeContext: routeData, markerContext: [...mcpInfo, ...depotInfo] }}>
                        <Map />
                    </MapContext.Provider>
                </div>
                <div className={cx('footer')}>Footer</div>
            </div>
            <div className={cx('sidenav', 'right-sidenav')}>
                <RightSideBar content={collectors} />
            </div>
        </div>
    );
}

export default App;
