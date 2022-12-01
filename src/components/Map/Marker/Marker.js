import classNames from 'classnames/bind';
import { Marker } from 'react-map-gl';
import Popup from 'reactjs-popup';

import { depot, mcp } from '~/assets/icon';
import styles from './Marker.module.scss';
import './Modal.css';
import geojson from '../data';

const cx = classNames.bind(styles);
function MarkerComponent({ children, item }) {
    let icon = mcp.logo;
    let mcpFlag = true;
    if (item.properties.type === 'depot') {
        icon = depot.logo;
        mcpFlag = false;
    }
    const iconClasses = cx('icon', {
        mcp: mcpFlag,
        depot: !mcpFlag,
    });
    return (
        <Marker
            longitude={item.geometry.coordinates[0]}
            latitude={item.geometry.coordinates[1]}
            anchor="bottom"
            // onClick={() => {
            //     alert(item.properties.description);
            // }}
        >
            <Popup
                // className={cx('popup')}
                // className=""
                trigger={
                    <div className={cx('marker')}>
                        <img className={iconClasses} src={icon}></img>
                    </div>
                }
                modal
                position="right-center"
            >
                {(close) => (
                    <div className={cx('modal-box')}>
                        <div className={cx('modal-header')}>{item.properties.type || 'mcp'}</div>
                        <div className={cx('modal-content')}>
                            <div className={cx('modal-content-item')}>
                                <p>title:</p>
                                <p>abc</p>
                            </div>
                            <div className={cx('modal-content-item')}>
                                <p>title:</p>
                                <p>abc</p>
                            </div>
                            <div className={cx('modal-content-item')}>
                                <p>title:</p>
                                <p>abc</p>
                            </div>
                            <div className={cx('modal-content-item')}>
                                <p>title:</p>
                                <p>abc</p>
                            </div>
                            <div className={cx('modal-content-item')}>
                                <p>title:</p>
                                <p>abc</p>
                            </div>
                        </div>
                        <div className={cx('actions')}>
                            <button
                                className={cx('modal-btn')}
                                onClick={() => {
                                    close();
                                }}
                            >
                                Close modal
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        </Marker>
    );
}

export default MarkerComponent;
