import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export const RouteMap = ({ route, setChoosedRoute, setIsAssigningRoute }) => {
    return (
        <div className="container-route-map" onClick={() => setChoosedRoute(route)}>
            <div className="header-route-map">
                <h5>{route.length} MCP pick up</h5>
                <button
                    className="button-plus"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsAssigningRoute(true);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className="container-address-mcps">
                {/* {route.map((MCP, index) => {
                    return (
                        <div className="address-mcp" key={index}>
                            <p>{MCP.street}</p>
                            <p>District {MCP.district}</p>
                        </div>
                    );
                })} */}
                <div className="address-mcp">
                    <p>Distance</p>
                    <p>7km</p>
                </div>
            </div>
        </div>
    );
};
