import classNames from 'classnames/bind';
import { Marker } from 'react-map-gl';
import Popup from 'reactjs-popup';

import { depot, mcp } from '~/assets/icon';
import styles from './Marker.module.scss';
import './Modal.css';
import geojson from '../data';
import MCPMarker from './MCPMarker';
import DepotMarker from './DepotMarker';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function MarkerComponent({ children, item, popUpContent }) {
    const [mcpFlag, setMCPFlag] = useState();
    const [data, setData] = useState();
    const [coordinates, setCoor] = useState([]);
    useEffect(() => {
        if ('depot_id' in item) {
            setMCPFlag(true);
        } else {
            setMCPFlag(false);
        }
        if ('gg_location' in item) {
            setCoor(item.gg_location.split(','));
        }
        setData(item);
    }, [item]);
    return coordinates.length > 0 ? (
        <Marker longitude={parseFloat(coordinates[1])} latitude={parseFloat(coordinates[0])} anchor="bottom">
            {mcpFlag ? <MCPMarker item={item}></MCPMarker> : <DepotMarker item={item}></DepotMarker>}
        </Marker>
    ) : null;
}

export default MarkerComponent;
