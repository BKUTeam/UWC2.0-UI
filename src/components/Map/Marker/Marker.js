import classNames from 'classnames/bind';
import { Marker } from 'react-map-gl';
import Popup from 'reactjs-popup';

import { depot, mcp } from '~/assets/icon';
import styles from './Marker.module.scss';
import './Normal.css';
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
                className={cx('popup')}
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
                    <div className="modal">
                        <div className="header">{item.properties.type || 'mcp'}</div>
                        <div className="content"> {item.properties.description}</div>
                        <div className="actions">
                            <button
                                className="button"
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
