import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { useRef, useState, useEffect, createRef } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL from 'react-map-gl';
import styles from './Map.module.scss';
import geojson from './data';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from './Marker';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const cx = classNames.bind(styles);
let center = { lng: 106.65797153503293, lat: 10.772106611692124 };
const mapStyles = 'mapbox://styles/tanlethanh/clb3c5thc000g15kx1kmpb93p';

const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf',
    },
};
function Map() {
    const mapRef = useRef(null);

    const [state, setState] = useState({
        viewport: {
            width: '100%',
            height: '100%',
            latitude: center.lat,
            longitude: center.lng,
            zoom: 15,
        },
    });

    return (
        <div className={cx('map-wrapper')}>
            <div className={cx('map-container')}>
                <ReactMapGL
                    {...state.viewport}
                    mapStyle={mapStyles}
                    onMove={(viewport) => setState(viewport)}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                >
                    {geojson.features.map((item, index) => {
                        return <Marker key={index} item={item}></Marker>;
                    })}
                </ReactMapGL>
            </div>
        </div>
    );
}
export default Map;
