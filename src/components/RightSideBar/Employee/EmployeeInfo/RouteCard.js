import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import styles from './card.module.scss';

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
function RouteCard({
    route = defaultRoute,
    onClickProp = {
        HandleRenderMap: () => {},
    },
}) {
    const content = {
        ID: route.id,
        NumMCP: route.list_node.length || 0,
        Duration: route.render_route.routes[0].duration,
        Distance: route.render_route.routes[0].distance,
        Weight: route.render_route.routes[0].weight,
    };
    console.log(route);
    const onClickRenderHandle = () => {
        // console.log('render');
        onClickProp.HandleRenderMap(route);
    };
    return (
        <div className={cx('card-wrapper')} onClick={onClickRenderHandle}>
            <div className={cx('card-header')}>
                <div className={cx('card-tile', 'bold')}>{content.NumMCP} Waypoints</div>
            </div>
            <div className={cx('card-content')}>
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

export default RouteCard;
