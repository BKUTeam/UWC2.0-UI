import classNames from 'classnames/bind';
import { HalfMalf } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import axios from 'axios';

import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { MapContext } from '~/App';

import styles from './Route.module.scss';
import RouteComponent from './RouteComponent';
import { routeData } from '~/components/Map/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function RouteListComponent({}) {
    const mapContext = useContext(MapContext);
    const [routes, setRoutes] = useState({
        employee_id: -1,
        routes: [],
    });
    const [show, setShow] = useState(false);
    // console.log(mapContext.routes);
    useEffect(() => {
        setRoutes(mapContext.routes);
    }, [mapContext.routes]);
    useEffect(() => {
        if (mapContext.assigning) {
            setShow(true);
        }
    }, [mapContext.routes, mapContext.assigning]);
    const HandleRenderMap = (route) => {
        // console.log('onclick handle');
        const cur_route = { ...routeData };
        cur_route.source.data.geometry.coordinates = route.render_route.routes[0].geometry.coordinates;
        // mapContext.setRouteData([{ route: cur_route, id: route.id }]);
        let mcps = [];
        let depots = [];
        let factories = [];
        for (const item of route.list_node) {
            if (item.type === 'DEPOT') {
                depots.push({ id: item.id, gg_location: item.location });
            } else if (item.type === 'MCP') {
                mcps.push({ id: item.id, gg_location: item.location });
            } else if (item.type === 'FACTORY') {
                factories.push({ id: item.id, gg_location: item.location });
            }
        }
        // mapContext.setMcps(mcps);
        // mapContext.setDepots(depots);
        // mapContext.setFactories(factories);
        mapContext.setHistory([
            ...mapContext.history,
            {
                mcps: mcps,
                depots: depots,
                factories: factories,
                routes: [{ route: cur_route, id: route.id }],
            },
        ]);
    };
    const HandleAssignRoute = (route_id) => {
        mapContext.setAssigning(true);
        const assignRoute = async (route_id, employee_id) => {
            await axios
                .post(
                    `http://localhost:5000/api/task-assignment/routes?collector-id=${employee_id}&route-id=${route_id}&action=ASSIGN`,
                )
                .then((res) => {
                    const routes = mapContext.routes.routes;
                    for (var i = 0; i < routes.length; i++) {
                        if (routes[i].id === route_id) {
                            routes.splice(i, 1);
                        }
                    }
                    mapContext.setRoutes({
                        employee_id: mapContext.routes.employee_id,
                        routes: routes,
                    });
                    mapContext.setAssigning(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        assignRoute(route_id, routes.employee_id);
        const newEmployees = mapContext.employees;
        newEmployees.forEach((item) => {
            if (item.id === routes.employee_id) {
                item.state = 'BUSY';
            }
        });
        mapContext.setEmployees(newEmployees);
    };
    const RouteOnClickProps = {
        HandleRenderMap: HandleRenderMap,
        HandleAssignRoute: HandleAssignRoute,
    };
    const OnClickBackHandle = () => {
        mapContext.setHistory([mapContext.history[0]]);
        mapContext.setMcps([]);
        mapContext.setDepots([]);
        mapContext.setFactories([]);
        mapContext.setRouteData([]);
    };
    const ToggleShow = () => {
        setShow(!show);
    };
    const handleGetRouteByMCPPool = () => {
        // mapContext.setRoutes({
        //     employee_id: content['Employee ID'],
        //     routes: [],
        // });
        mapContext.setAssigning(true);
        const options = {
            url: `http://localhost:5000/api/task-assignment/routes?collector-id=${mapContext.routes.employee_id}&use-mcp-pool=true`,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        };
        axios(options).then((response) => {
            let newRoutes = response.data.routes;
            newRoutes.forEach((item) => {
                item.new = 'Pool';
            });
            mapContext.setRoutes({
                employee_id: mapContext.routes.employee_id,
                routes: mapContext.routes.routes.concat(newRoutes),
            });
            mapContext.setAssigning(false);
        });
    };
    const handelGetRouteByReduceThreshhold = () => {
        mapContext.setAssigning(true);
        const options = {
            url: `http://localhost:5000/api/task-assignment/routes?collector-id=${mapContext.routes.employee_id}&use-low-threshold=true`,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        };
        axios(options).then((response) => {
            let newRoutes = response.data.routes;
            newRoutes.forEach((item) => {
                item.new = 'Threshold';
            });
            mapContext.setRoutes({
                employee_id: mapContext.routes.employee_id,
                routes: mapContext.routes.routes.concat(newRoutes),
            });
            mapContext.setAssigning(false);
        });
    };
    return show ? (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('hide-btn')} onClick={ToggleShow}>
                    <FontAwesomeIcon icon={faCircleChevronDown} />
                    Hide
                </div>
                <div className={cx('left-actions')}>
                    <div className={cx('btn')} onClick={OnClickBackHandle}>
                        Back
                    </div>
                </div>
                <div className={cx('title')}>Route</div>
                <div className={cx('right-actions')}>
                    <div className={cx('btn')} onClick={handleGetRouteByMCPPool}>
                        MCPPool
                    </div>
                    <div className={cx('btn')} onClick={handelGetRouteByReduceThreshhold}>
                        Reducethreshold
                    </div>
                </div>
            </div>
            <div className={cx('routes-content')}>
                {mapContext.assigning ? (
                    <HalfMalf text={'Loading...'} weight={'150px'} height={'150px'}></HalfMalf>
                ) : routes.routes.length > 0 ? (
                    routes.routes.map((routeItem, index) => {
                        return (
                            <RouteComponent
                                key={index}
                                route={routeItem}
                                onClickProp={RouteOnClickProps}
                                state={routeItem.new}
                            ></RouteComponent>
                        );
                    })
                ) : null}
            </div>
        </div>
    ) : (
        <div className={cx('hide-wrapper')}>
            <div className={cx('show-btn')} onClick={ToggleShow}>
                <FontAwesomeIcon icon={faCircleChevronUp} />
                Show
            </div>
        </div>
    );
}

export default RouteListComponent;
