import classNames from 'classnames/bind';
import { useContext, useState, useEffect } from 'react';
import ReactMapGL, { Layer, Source } from 'react-map-gl';

import styles from './Map.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from './Marker';
import { defaultViewport, mapStyles } from './data';
import { MapContext } from '~/App';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function Map() {
    const context = useContext(MapContext);
    // console.log(context);
    const [history] = context.history.slice(-1);
    // console.log(history);
    // console.log(history);
    const [state, setState] = useState(defaultViewport);
    return (
        <div className={cx('map-wrapper')}>
            <div className={cx('map-container')}>
                <ReactMapGL
                    {...state.viewport}
                    mapStyle={mapStyles}
                    onMove={(viewport) => setState(viewport)}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                >
                    {history.mcps.map((mcp, index) => {
                        return <Marker key={index} item={mcp} type="mcp"></Marker>;
                    })}
                    {history.depots.map((depot, index) => {
                        return <Marker key={index} item={depot} type="depot"></Marker>;
                    })}
                    {history.routes.map((route, index) => {
                        {
                            /* console.log('Rerender route'); */
                        }
                        {
                            /* console.log(route.source); */
                        }
                        return (
                            <Source
                                key={index + route.route.source.data.geometry.coordinates[0][1] + route.id}
                                {...route.route.source}
                            >
                                <Layer {...route.route.layer}></Layer>
                            </Source>
                        );
                    })}
                    {history.factories.map((factory, index) => {
                        return <Marker key={index} item={factory} type="factory"></Marker>;
                    })}
                </ReactMapGL>
            </div>
        </div>
    );
}
export default Map;
