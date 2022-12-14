import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MapContext } from '~/App';
import styles from './Route.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
// const defaultRouteInfo = {
//     ID: 0,
//     NumMCP: 6,
//     Duration: '2h3p',
//     Distance: '2km',
//     Weight: '16t',
// };
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
    route = defaultRoute,
    onClickProp = {
        HandleRenderMap: () => {},
        HandleAssignRoute: () => {},
    },
    state = 'default',
}) {
    const content = {
        ID: route.id,
        NumMCP: route.list_node.length || 0,
        Duration: route.render_route.routes[0].duration,
        Distance: route.render_route.routes[0].distance,
        Weight: route.render_route.routes[0].weight,
    };
    // console.log(route);
    const onClickRenderHandle = () => {
        onClickProp.HandleRenderMap(route);
    };
    const onClickAssignHandle = (event) => {
        event.stopPropagation();
        onClickProp.HandleAssignRoute(route.id);
    };
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
                    <div className={cx('bold')}>Origin</div>
                    <div className={cx('medium')}>{state}</div>
                </div>
                {Object.keys(content).map((key) => {
                    return key === 'NumMCP' ? null : (
                        <div key={key} className={cx('card-content-item')}>
                            <div className={cx('bold')}>{key}</div>
                            <div className={cx('medium')}>{content[key]}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default RouteComponent;
