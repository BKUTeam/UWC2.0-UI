import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MapContext } from '~/App';
import styles from './Route.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
const defaultRoute = {
    list_node: [],
    render_route: {
        routes: [
            {
                duration: 0,
                distance: 0,
                weight: 0,
            },
        ],
    },
    id: -1,
};
function RouteComponent({
    employee = { vehicle_cap: 0 },
    route = defaultRoute,
    onClickProp = {
        HandleRenderMap: () => {},
        HandleAssignRoute: () => {},
    },
    state = 'default',
}) {
    console.log(route);
    var weight = 0;
    route.list_node.forEach((node) => {
        weight += node.loaded;
    });
    const content = {
        ID: route.id,
        NumMCP: route.list_node.length || 0,
        Duration: route.render_route.routes[0].duration,
        Distance: route.render_route.routes[0].distance,
        Weight: weight,
        CapWeight: employee.vehicle_cap,
    };
    console.log(employee);
    const onClickRenderHandle = () => {
        onClickProp.HandleRenderMap(route);
    };
    const onClickAssignHandle = (event) => {
        event.stopPropagation();
        onClickProp.HandleAssignRoute(route.id);
    };
    function convertToTime(time = 0) {
        var hours = Math.floor(parseInt(time) / 3600);
        var minutes = Math.floor((parseInt(time) - hours * 3600) / 60);
        return `${hours}h${minutes}m`;
    }
    return (
        <div className={cx('card-wrapper')} onClick={onClickRenderHandle}>
            <div className={cx('card-header')}>
                <div className={cx('card-title', 'bold')}>{content.NumMCP} Waypoints</div>
                <div className={cx('card-actions')}>
                    <div className={cx('card-actions-btn')} onClick={onClickAssignHandle}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>
            <div className={cx('card-content')}>
                <div className={cx('card-content-item')}>
                    <div className={cx('bold')}>ID</div>
                    <div className={cx('medium')}>{content.ID}</div>
                </div>
                <div className={cx('card-content-item')}>
                    <div className={cx('bold')}>Origin</div>
                    <div className={cx('medium')}>{state}</div>
                </div>
                <div className={cx('card-content-item')}>
                    <div className={cx('bold')}>Duration</div>
                    <div className={cx('medium')}>{convertToTime(content.Duration)}</div>
                </div>
                <div className={cx('card-content-item')}>
                    <div className={cx('bold')}>Distance</div>
                    <div className={cx('medium')}>{Number.parseFloat(content.Distance / 1000).toFixed(2)}</div>
                </div>
                <div className={cx('card-content-item')}>
                    <div className={cx('bold')}>Weight</div>
                    <div className={cx('medium')}>
                        {Number.parseFloat(content.Weight / 1000).toFixed(2)} /{' '}
                        {Number.parseFloat(Number.parseFloat(content.CapWeight) / 1000).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RouteComponent;
