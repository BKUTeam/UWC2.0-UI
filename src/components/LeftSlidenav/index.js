import React from 'react';
// import style from './style.module.scss';
import classNames from 'classnames/bind';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
    faTruck,
    faClock,
    faMessage,
    faCalendar,
    faUser,
    faTruckMoving,
    faWarehouse,
    faDumpster,
} from '@fortawesome/free-solid-svg-icons';

// const cx = classNames.bind(style);

export const LeftSlidenav = () => {
    return (
        <div className="container-left-slidenav">
            <div className="header-left-slidenav">
                <div className="header-left-slidenav-header">
                    <img
                        src="https://nld.mediacdn.vn/291774122806476800/2022/9/25/hoai-lam-3-01-1664066614250447494697.jpg"
                        className="img-admin"
                    />
                    <div className="container-info-admin">
                        <p className="name-admin">Thanh tân</p>
                        <p className="role-admin">admin</p>
                    </div>
                </div>
                <div className="header-left-slidenav-body">
                    <div>
                        <div className="link-left-slidenav">
                            <FontAwesomeIcon icon={faCalendar} /> <span>Today</span>
                        </div>
                        <div className="link-left-slidenav">
                            <FontAwesomeIcon icon={faClock} />
                            <span>Schedule</span>
                        </div>
                        <div className="link-left-slidenav">
                            <div className="container-left-sidenav-message">
                                <div>
                                    <FontAwesomeIcon icon={faMessage} />
                                    <span>Message</span>
                                </div>
                                <div className="number-message">1</div>
                            </div>
                        </div>
                        <div className="link-left-slidenav active">
                            <FontAwesomeIcon icon={faTruck} />
                            <span>Dispatch</span>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h5 className="title-links">Workers</h5>
                        <div className="link-left-slidenav">
                            {/* <FaRegCalendar /> */}
                            <FontAwesomeIcon icon={faUser} />
                            <span>Employees</span>
                        </div>
                        <div className="link-left-slidenav">
                            <FontAwesomeIcon icon={faTruckMoving} />
                            <span>Veticles</span>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h5 className="title-links">Facilities</h5>
                        <div className="link-left-slidenav">
                            <FontAwesomeIcon icon={faDumpster} />
                            <span>MCP</span>
                        </div>
                        <div className="link-left-slidenav">
                            <FontAwesomeIcon icon={faWarehouse} />
                            <span>Depot</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button className="button-back">Back</button> */}
        </div>
    );
};
