import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { RouteMap } from './routeMap';
import './style.css';
import { faAngleLeft, faAngleRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { RouteDetail } from './routeDetail/RouteDetail';
const routes = [
    [
        {
            street: 'Phạm văn thạnh',
            district: '12',
        },
        {
            street: 'Phạm văn thạnh',
            district: '13',
        },
    ],
    [
        {
            street: 'Phạm văn thạnh',
            district: '12',
        },
        {
            street: 'Phạm văn thạnh',
            district: '13',
        },
    ],
    [
        {
            street: 'Phạm văn thạnh',
            district: '12',
        },
        {
            street: 'Phạm văn thạnh',
            district: '13',
        },
        {
            street: 'Phạm văn thạnh',
            district: '12',
        },
        {
            street: 'Phạm văn thạnh',
            district: '13',
        },
    ],
    [
        {
            street: 'Phạm văn thạnh',
            district: '12',
        },
        {
            street: 'Phạm văn thạnh',
            district: '13',
        },
    ],
];
export const Footer = () => {
    const slideRoutes = useRef();
    const [isAssigningRoute, setIsAssigningRoute] = useState(false);
    const [indexSlide, setIndexSlide] = useState(0);
    const [choosedRoute, setChoosedRoute] = useState(null);
    const handlePreviosSlideRoutes = () => {
        if (indexSlide !== 0) {
            setIndexSlide(indexSlide - 1);
            slideRoutes.current.setAttribute('style', `left: -${(indexSlide - 1) * 260 - 10}px`);
        }
    };
    const handleNextSlideRoutes = () => {
        if (indexSlide + 1 < routes.length) {
            setIndexSlide(indexSlide + 1);
            slideRoutes.current.setAttribute('style', `left: -${(indexSlide + 1) * 260 - 10}px`);
        }
    };
    return (
        <>
            {/* <div className="footer"> */}
            <div className="container-footer">
                {!choosedRoute ? (
                    <div className="header-footer">
                        <h3 className="title-footer">Optimized routes</h3>
                        <button>MCP Pool</button>
                    </div>
                ) : (
                    <div className="header-footer">
                        <button onClick={() => setChoosedRoute(null)}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                            black
                        </button>
                        <h3 className="title-footer">Detail route</h3>

                        <button>MCP Pool</button>
                    </div>
                )}
                <div className="container-footer-of-footer">
                    {!choosedRoute ? (
                        <>
                            <button
                                className={indexSlide === 0 ? 'btn-footer btn-disabled' : 'btn-footer'}
                                onClick={handlePreviosSlideRoutes}
                            >
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                            <div className="footer-routes">
                                <div className="container-routes" ref={slideRoutes}>
                                    {routes.map((route, index) => (
                                        <RouteMap
                                            route={route}
                                            key={index}
                                            setIsAssigningRoute={setIsAssigningRoute}
                                            setChoosedRoute={setChoosedRoute}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button
                                className={indexSlide + 1 < routes.length ? 'btn-footer' : 'btn-footer btn-disabled'}
                                onClick={handleNextSlideRoutes}
                            >
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </>
                    ) : (
                        <div className="footer-route-detail">
                            <RouteDetail setIsAssigningRoute={setIsAssigningRoute} route={choosedRoute} />
                        </div>
                    )}
                </div>
            </div>
            {/* </div> */}
            {isAssigningRoute && (
                <div className="container-modal-assign-route">
                    <div>
                        <b>Confirm</b>
                        <p>Do you want to assign this route to the collector? </p>
                        <div className="container-btn-confirm-assign-route">
                            <button
                                onClick={() => {
                                    setIsAssigningRoute(false);
                                    setChoosedRoute(null);
                                }}
                            >
                                OK
                            </button>
                            <button
                                onClick={() => {
                                    setIsAssigningRoute(false);
                                    setChoosedRoute(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
