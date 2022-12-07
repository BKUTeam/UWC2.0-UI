import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const RouteDetail = ({ route, setIsAssigningRoute }) => {
    return (
        <div className="container-route-detail">
            <div className="header-route-map">
                <h5>{route.length} MCP pick up</h5>
                <button className="button-plus" onClick={(e) => e.stopPropagation()}>
                    <FontAwesomeIcon icon={faPlus} onClick={() => setIsAssigningRoute(true)} />
                </button>
            </div>
            <div className="container-address-mcps">
                {route.map((MCP, index) => {
                    return (
                        <div className="address-mcp" key={index}>
                            <p>{MCP.street}</p>
                            <p>District {MCP.district}</p>
                        </div>
                    );
                })}
            </div>
            <div className="distance-route">Distance: 7km</div>
        </div>
    );
};
