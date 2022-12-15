// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useContext, useEffect, useState } from 'react';
// import { RouteMap } from './routeMap';
// import './style.css';
// import { faAngleLeft, faAngleRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
// import { RouteDetail } from './routeDetail/RouteDetail';
// import { MapContext } from '~/App';
// import routeData from '~/components/Map/TemplateRoute';

// // request low threshold, mcppool
// export const Footer = () => {
//     const [isAssigningRoute, setIsAssigningRoute] = useState(false);
//     const [indexStart, setIndexStart] = useState(0);
//     const [routesSliced, setRoutesSlided] = useState(routes.slice(indexStart, indexStart + 3));
//     const [choosedRoute, setChoosedRoute] = useState(null);

//     const mapContext = useContext(MapContext);

//     const handleNextIndex = () => {
//         if (indexStart + 3 < routes.length) {
//             setIndexStart(indexStart + 1);
//             setRoutesSlided(routes.slice(indexStart + 1, indexStart + 4));
//         }
//     };
//     const handlePreviosIndex = () => {
//         if (indexStart > 0) {
//             setIndexStart(indexStart - 1);
//             setRoutesSlided(routes.slice(indexStart - 1, indexStart + 2));
//         }
//     };

//     useEffect(() => {}, [mapContext.routes]);

//     const renderRoute = (route) => {
//         const cur_route = { ...routeData };
//         cur_route.source.data.geometry.coordinates = route.render_route.routes[0].geometry.coordinates;
//         mapContext.setRouteData([{ route: cur_route, id: route.id }]);
//         let mcps = [];
//         let depots = [];
//         let factories = [];
//         for (const item of route.list_node) {
//             if (item.type === 'DEPOT') {
//                 depots.push({ id: item.id, gg_location: item.location });
//             } else if (item.type === 'MCP') {
//                 mcps.push({ id: item.id, gg_location: item.location });
//             } else if (item.type === 'FACTORY') {
//                 factories.push({ id: item.id, gg_location: item.location });
//             }
//         }
//         mapContext.setMcps(mcps);
//         mapContext.setDepots(depots);
//         mapContext.setFactories(factories);
//         // mapContext
//     };

//     return (
//         <>
//             <div className="footer">
//                 <div className="container-footer">
//                     {!choosedRoute ? (
//                         <div className="header-footer">
//                             <h3 className="title-footer">Optimized routes</h3>
//                             <button>MCP Pool</button>
//                         </div>
//                     ) : (
//                         <div className="header-footer">
//                             <button onClick={() => setChoosedRoute(null)}>
//                                 <FontAwesomeIcon icon={faCaretLeft} />
//                                 black
//                             </button>
//                             <h3 className="title-footer">Detail route</h3>

//                             <button>MCP Pool</button>
//                         </div>
//                     )}
//                     <div className="container-footer-of-footer">
//                         {!choosedRoute ? (
//                             <>
//                                 {mapContext.routes.map((route) => {
//                                     return (
//                                         <div
//                                             key={route.id}
//                                             onClick={() => {
//                                                 renderRoute(route);
//                                                 // console.log('Route button onclick');
//                                             }}
//                                             style={{
//                                                 border: '1px solid #000',
//                                             }}
//                                         >
//                                             {route.id}
//                                         </div>
//                                     );
//                                 })}
//                             </>
//                         ) : (
//                             <div className="footer-route-detail">
//                                 <RouteDetail setIsAssigningRoute={setIsAssigningRoute} route={choosedRoute} />
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             {isAssigningRoute && (
//                 <div className="container-modal-assign-route">
//                     <div>
//                         <b>Confirm</b>
//                         <p>Do you want to assign this route to the collector? </p>
//                         <div className="container-btn-confirm-assign-route">
//                             <button
//                                 onClick={() => {
//                                     setIsAssigningRoute(false);
//                                     setChoosedRoute(null);
//                                 }}
//                             >
//                                 OK
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     setIsAssigningRoute(false);
//                                     setChoosedRoute(null);
//                                 }}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

export { default as Footer } from './Route';
