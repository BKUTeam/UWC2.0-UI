import classNames from 'classnames/bind';
import { Map } from '~/components/Map';
import styles from '~/components/GlobalStyles/GlobalStyles.module.scss';
import { createContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { dataFetch } from './utils/DataFetch';

import Header from '~/components/Header/Header';
import { RightSideBarComponent } from '~/components/RightSideBar';


import { LeftSlidenav } from './components/LeftSlidenav';
import { Footer } from './components/Footer/index';

export const MapContext = createContext();

const cx = classNames.bind(styles);
export const MENU_ITEMS = [
    {
        title: 'Janitor',
        url: 'http://localhost:5000/api/resources/janitors',
        id: 0,
    },
    {
        title: 'Collector',
        url: 'http://localhost:5000/api/resources/collectors',
        id: 1,
    },
];
function App() {
    const [routeData, setRouteData] = useState([]);
    const [mcpInfo, setmcpInfo] = useState([]);
    const [depotInfo, setdepotInfo] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [currentView, setCurrentView] = useState(MENU_ITEMS[1]);
    useEffect(() => {
        dataFetch('http://localhost:5000/api/resources/mcps/', setmcpInfo);
        dataFetch('http://localhost:5000/api/resources/depots/', setdepotInfo);
    }, []);
    useEffect(() => {
        dataFetch(currentView.url, setEmployees);
    }, [currentView]);
    const changeEmployeeHandle = (view) => {
        setCurrentView(view);
    };
    return (            
        <div className={cx('app')}>
            <div className={cx('header')}>
                {<Header currentView={currentView} onChangeEmployee={changeEmployeeHandle} />}
            </div>
            <div className={cx('sidenav', 'left-sidenav')}>
                <LeftSlidenav />
            </div>
            <div className={cx('content')}>
                <div className={cx('main-content')}>
                    <MapContext.Provider value={{ routeContext: routeData, markerContext: [...mcpInfo, ...depotInfo] }}>
                        <Map />
                    </MapContext.Provider>
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
            
            <div className={cx('sidenav', 'right-sidenav')}>
                <RightSideBarComponent content={employees} />
            </div>
        </div>
    )
}

export default App;
