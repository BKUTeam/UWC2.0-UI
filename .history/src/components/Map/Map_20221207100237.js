import classNames from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';
import {mapboxgl} from 'mapbox-gl';
import ReactMapGL, { Layer, Source, useMap } from 'react-map-gl';

import styles from './Map.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from './Marker';
import { defaultViewport, mapStyles, markerData } from './data';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const cx = classNames.bind(styles);

const start = [106.65797153503293, 10.772106611692124];
const endPoint = [106.658798, 10.782727];
async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
        { method: 'GET' },
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route,
        },
    };
    const routeLayer = {
        id: 'route',
        type: 'line',
        paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75,
        },
    };
    const routeSource = {
        type: 'geojson',
        data: geojson,
    };
    const result = {
        layer: routeLayer,
        source: routeSource,
    };

    // console.log(result);
    return result;
}

function Map({ routeData, markerData }) {
    // const mapRef = useMap();
    const [markerState, setMarkerState] = useState();
    const [state, setState] = useState(defaultViewport);
    const [routeState, setRouteState] = useState(false);
    useEffect(() => {
        if (markerData.length > 0) {
            setMarkerState(true);
        }
    }, [markerData]);
    useEffect(() => {
        if (routeData.length > 0) {
            setRouteState(true);
        }
    }, [routeData]);
    console.log('marker: ', markerData);
    console.log('route: ', routeData);
    return (
        <div className={cx('map-wrapper')}>
            <div className={cx('map-container')}>
                <ReactMapGL
                    {...state.viewport}
                    mapStyle={mapStyles}
                    onMove={(viewport) => setState(viewport)}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                >
                    {markerData.map((item, index) => {
                        if (markerState) {
                            return <Marker key={index} item={item}></Marker>;
                        } else {
                            return null;
                        }
                    })}
                    {routeData.map((route, index) => {
                        if (routeState) {
                            return (
                                <Source key="source-map" {...route.source}>
                                    <Layer {...route.layer}></Layer>
                                </Source>
                            );
                        } else {
                            return null;
                        }
                    })}
                </ReactMapGL>
            </div>
        </div>
    );
}
export default Map;
