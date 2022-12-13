import classNames from 'classnames/bind';
import { Map } from '~/components/Map';
import styles from '~/components/GlobalStyles/GlobalStyles.module.scss';
import { createContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { dataFetch } from './utils/DataFetch';

import Header from '~/components/Header/Header';
import { RightSideBarComponent } from '~/components/RightSideBar';
import axios from 'axios';
import { LeftSlidenav } from './components/LeftSlidenav';
import { Footer } from './components/Footer/index';

import { pushSuccessNoti } from '~/utils/Notify';
import ListEmployee from './components/RightSideBar/index';
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
    let init_data = {};
    const [assigningTask, setAssigningTask] = useState(false);
    // State of list routes
    const [routes, setRoutes] = useState({
        employee_id: -1,
        routes: [],
    });

    useEffect(() => {
        const getInitData = async () => {
            await axios
                .all([
                    axios.get('http://localhost:5000/api/resources/mcps/'),
                    axios.get('http://localhost:5000/api/resources/depots/'),
                    axios.get('http://localhost:5000/api/resources/factories/'),
                ])
                .then(
                    axios.spread((res1, res2, res3) => {
                        console.log(res3);
                        return {
                            mcps: res1.data,
                            depots: res2.data,
                            factories: res3.data,
                            routes: [],
                        };
                    }),
                )
                .then((data) => {
                    init_data = data;
                    setHistory([data]);
                });
        };
        getInitData();
    }, []);

    useEffect(() => {
        pushSuccessNoti();
        dataFetch(currentView.url, setEmployees);
    }, [currentView]);

    // useEffect(() => {
    //     if (firstMount) {
    //         setFirstMount(false);
    //     } else {
    //         setHistory([
    //             ...history,
    //             {
    //                 mcps: mcpInfo,
    //                 depots: depotInfo,
    //                 factories: factoriesInfo,
    //                 routes: routeData,
    //             },
    //         ]);
    //     }
    //     // }
    // }, [mcpInfo, depotInfo, factoriesInfo, routeData]);
    // console.log(history);

    const changeEmployeeHandle = (view) => {
        setCurrentView(view);
    };
    // console.log(routes);
    return (
        <MapContext.Provider
            value={{
                initData: init_data,

                routeData: routeData, //Route in map
                setRouteData: setRouteData,

                routes: routes, //Routes in footer
                setRoutes: setRoutes,

                mcps: mcpInfo,
                setMcps: setmcpInfo,

                depots: depotInfo,
                setDepots: setdepotInfo,

                factories: factoriesInfo,
                setFactories: setFactoriesInfo,

                history: history,
                setHistory: setHistory,

                employees: employees,
                setEmployees: setEmployees,

                currentView: currentView,
                setCurrentView: setCurrentView,

                assigning: assigningTask,
                setAssigning: setAssigningTask,
            }}
        >
            <div className={cx('app')}>
                <div className={cx('header')}>{<Header currentView={currentView} />}</div>
                {/* <div className={cx('sidenav', 'left-sidenav')}> */}
                <LeftSlidenav />
                {/* </div> */}
                <LeftSlidenav />
                <div className={cx('content')}>
                    <div className={cx('main-content')}>
                        <Map />
                    </div>
                    {/* <div className={cx('footer')}> */}
                    {/* </div> */}
                </div>

                <Footer />
                <div className={cx('sidenav', 'right-sidenav')}>
                    <ListEmployee />
                </div>
            </div>
        </MapContext.Provider>
    );
}

export default App;
