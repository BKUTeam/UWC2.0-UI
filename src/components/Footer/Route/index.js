import classNames from 'classnames/bind';
import axios from 'axios';

import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { MapContext } from '~/App';

import styles from './Route.module.scss';
import RouteComponent from './RouteComponent';
import { routeData } from '~/components/Map/data';
const cx = classNames.bind(styles);

function RouteListComponent({}) {
    const mapContext = useContext(MapContext);
    const [routes, setRoutes] = useState({
        employee_id: -1,
        routes: [],
    });
    // console.log(mapContext.routes);
    useEffect(() => {
        setRoutes(mapContext.routes);
    }, [mapContext.routes.routes]);
    useEffect(() => {}, [mapContext.routes]);
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
        // send request to assign route
        const assignRoute = async (route_id, employee_id) => {
            await axios
                .post(
                    `http://localhost:5000/api/task-assignment/routes?collector-id=${employee_id}&route-id=${route_id}&action=ASSIGN`,
                )
                .then((res) => {
                    // console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        // console.log('assign route');
        const newEmployees = mapContext.employees;
        newEmployees.forEach((item, index) => {
            if (item.id === routes.employee_id) {
                item.state = 'BUSY';
            }
        });
        // console.log(routes);
        assignRoute(route_id, routes.employee_id);
        mapContext.setEmployees(newEmployees);
        mapContext.setAssigning(false);
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
    return routes.routes.length > 0 ? (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('left-actions')}>
                    <div className={cx('btn')} onClick={OnClickBackHandle}>
                        Back
                    </div>
                </div>
                <div className={cx('title')}>Route Component</div>
                <div className={cx('right-actions')}>
                    <div className={cx('btn')}>MCPPool</div>
                    <div className={cx('btn')}>Reducethreshold</div>
                </div>
            </div>
            <div className={cx('routes-content')}>
                {routes.routes.length > 0 ? (
                    routes.routes.map((routeItem, index) => {
                        return (
                            <RouteComponent
                                key={index}
                                route={routeItem}
                                onClickProp={RouteOnClickProps}
                            ></RouteComponent>
                        );
                    })
                ) : (
                    <>Loading</>
                )}
            </div>
        </div>
    ) : null;
}

export default RouteListComponent;
