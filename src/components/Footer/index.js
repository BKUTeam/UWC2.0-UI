import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
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
    const [isAssigningRoute, setIsAssigningRoute] = useState(false);
    const [indexStart, setIndexStart] = useState(0);
    const [routesSliced, setRoutesSlided] = useState(routes.slice(indexStart, indexStart + 3));
    const [choosedRoute, setChoosedRoute] = useState(null);
    const handleNextIndex = () => {
        if (indexStart + 3 < routes.length) {
            setIndexStart(indexStart + 1);
            setRoutesSlided(routes.slice(indexStart + 1, indexStart + 4));
        }
    };
    const handlePreviosIndex = () => {
        if (indexStart > 0) {
            setIndexStart(indexStart - 1);
            setRoutesSlided(routes.slice(indexStart - 1, indexStart + 2));
        }
    };
    return (
        <>
            <div className="footer">
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
                                    className={indexStart === 0 ? 'btn-footer btn-disabled' : 'btn-footer'}
                                    onClick={handlePreviosIndex}
                                >
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                                <div className="footer-routes">
                                    {routesSliced.map((route, index) => (
                                        <RouteMap
                                            route={route}
                                            key={index}
                                            setIsAssigningRoute={setIsAssigningRoute}
                                            setChoosedRoute={setChoosedRoute}
                                        />
                                    ))}
                                </div>
                                <button
                                    className={
                                        indexStart + 3 >= routes.length ? 'btn-footer btn-disabled' : 'btn-footer'
                                    }
                                    onClick={handleNextIndex}
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
            </div>
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
