// import classNames from 'classnames/bind';
import { Marker } from 'react-map-gl';

// import styles from './Marker.module.scss';
import './Modal.css';
import MCPMarker from './MCPMarker';
import DepotMarker from './DepotMarker';
import FactoryMarker from './FactoryMarker';
import { useState, useEffect } from 'react';
function MarkerComponent({ item, type }) {
    const [mcpFlag, setMCPFlag] = useState();
    const [data, setData] = useState();
    const [coordinates, setCoor] = useState([]);
    useEffect(() => {
        if ('gg_location' in item) {
            setCoor(item.gg_location.split(','));
        }
        setData(item);
    }, [item]);
    const renderMarker = () => {
        if (type === 'factory') {
            return <FactoryMarker></FactoryMarker>;
        }
        if (type === 'mcp') {
            return <MCPMarker item={data}></MCPMarker>;
        }
        if (type === 'depot') {
            return <DepotMarker item={data}></DepotMarker>;
        }
        return null;
    };
    return coordinates.length > 0 ? (
        <Marker longitude={parseFloat(coordinates[1])} latitude={parseFloat(coordinates[0])} anchor="bottom">
            {renderMarker()}
        </Marker>
    ) : null;
}

export default MarkerComponent;
