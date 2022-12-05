import classNames from 'classnames/bind';
import { Marker } from 'react-map-gl';

import styles from './Marker.module.scss';
import './Modal.css';
import MCPMarker from './MCPMarker';
import DepotMarker from './DepotMarker';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);
function MarkerComponent({ item }) {
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
            {mcpFlag ? <MCPMarker item={data}></MCPMarker> : <DepotMarker item={data}></DepotMarker>}
        </Marker>
    ) : null;
}

export default MarkerComponent;
