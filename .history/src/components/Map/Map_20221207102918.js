import classNames from 'classnames/bind';
import { useContext, useState, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Layer, Source } from 'react-map-gl';

import styles from './Map.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from './Marker';
import { defaultViewport, mapStyles } from './data';
import { MapContext } from '~/App';
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const cx = classNames.bind(styles);

function Map() {
    const context = useContext(MapContext);
    const [mapData, setMapData] = useState({
        markerData: [],
        routeData: [],
    });
    const [state, setState] = useState(defaultViewport);
    useEffect(() => {
        if (context.markerContext.length > 0) {
            setMapData({ ...mapData, markerData: context.markerContext });
        }
        if (context.routeContext.length > 0) {
            setMapData({ ...mapData, routeData: context.routeContext });
        }
    }, [context]);
    // console.log(mapData);
    return (
        <div className={cx('map-wrapper')}>
            <div className={cx('map-container')}>
                {/* <ReactMapGL
                    {...state.viewport}
                    mapStyle={mapStyles}
                    onMove={(viewport) => setState(viewport)}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                >
                    {mapData.markerData.map((item, index) => {
                        return <Marker key={index} item={item}></Marker>;
                    })}
                    {mapData.routeData.map((route, index) => {
                        return (
                            <Source key={index} {...route.source}>
                                <Layer {...route.layer}></Layer>
                            </Source>
                        );
                    })}
                </ReactMapGL> */}
                {/* <ReactMapGL
                    {...state.viewport}
                    mapStyle={mapStyles}
                    onMove={(viewport) => setState(viewport)}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                >

                </ReactMapGL> */}
            </div>
        </div>
    );
}
export default Map;
