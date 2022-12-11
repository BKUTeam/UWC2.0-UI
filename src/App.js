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

import { pushSuccessNoti } from '~/utils/Notify';
export const MapContext = createContext();

const cx = classNames.bind(styles);
export const MENU_ITEMS = [
    {
        title: 'Janitor',
        url: 'http://localhost:5000/api/resources/janitors',
        id: '0',
    },
    {
        title: 'Collector',
        url: 'http://localhost:5000/api/resources/collectors',
        id: '1',
    },
];
function App() {
    const [routeData, setRouteData] = useState([]);
    const [mcpInfo, setmcpInfo] = useState([]);
    const [depotInfo, setdepotInfo] = useState([]);
    const [factoriesInfo, setFactoriesInfo] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [currentView, setCurrentView] = useState(MENU_ITEMS[1]);
    const [firstMount, setFirstMount] = useState(true);
    const [history, setHistory] = useState([
        {
            mcps: [],
            depots: [],
            factories: [],
            routes: [],
        },
    ]);
    // State of list routes
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        dataFetch('http://localhost:5000/api/resources/mcps/', setmcpInfo);
        dataFetch('http://localhost:5000/api/resources/depots/', setdepotInfo);
        dataFetch('http://localhost:5000/api/resources/factories/', setFactoriesInfo);
    }, []);
    useEffect(() => {
        // if (setFirstMount) {
        //     setFirstMount(false);
        setHistory([
            ...history,
            {
                mcps: mcpInfo,
                depots: depotInfo,
                factories: factoriesInfo,
                routes: routeData,
            },
        ]);
        // }
    }, [mcpInfo, depotInfo, factoriesInfo, routeData]);
    // console.log(history);
    useEffect(() => {
        pushSuccessNoti();
        dataFetch(currentView.url, setEmployees);
    }, [currentView]);

    const changeEmployeeHandle = (view) => {
        setCurrentView(view);
    };

    console.log(currentView.id)

    return (
        <MapContext.Provider
            value={{
                routeData: routeData,
                setRouteData: setRouteData,
                routes: routes,
                setRoutes: setRoutes,
                mcps: mcpInfo,
                setMcps: setmcpInfo,

                depots: depotInfo,
                setDepots: setdepotInfo,
                factories: factoriesInfo,
                setFactories: setFactoriesInfo,
                history: history,
                setHistory: setHistory,
            }}
        >
            <div className={cx('app')}>
                <div className={cx('header')}>
                    {<Header currentView={currentView} onChangeEmployee={changeEmployeeHandle} />}
                </div>
                {/* <div className={cx('sidenav', 'left-sidenav')}>
                <LeftSlidenav />
            </div> */}
                <LeftSlidenav />
                <div className={cx('content')}>
                    <div className={cx('main-content')}>
                        <Map />
                    </div>
                    {/* <div className={cx('footer')}>
                    
                </div> */}
                    <Footer />
                </div>

                <div className={cx('sidenav', 'right-sidenav')}>
                    <RightSideBarComponent content={employees} type={currentView.id} />
                </div>
            </div>
        </MapContext.Provider>
    );
}

export default App;
