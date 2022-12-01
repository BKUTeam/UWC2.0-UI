import React from 'react';
import './style.css';
// const dashboardLinks = [
//     {
//         header: '',
//         Links: [
//             {
//                 icon: <FaRegCalendar />,
//                 text: 'Today',
//             },
//             {
//                 icon: <FaRegClock />,
//                 text: 'Schedule',
//             },
//             {
//                 icon: <MdMessage />,
//                 text: 'Message',
//             },
//             {
//                 icon: <FaTruckMoving />,
//                 text: 'Dispatch',
//             },
//         ],
//     },
// {
//     header: 'Workers',
//     Links: [
//         {
//             icon: <FaUserFriends />,
//             text: 'Employees',
//         },
//         {
//             icon: <FaTruck />,
//             text: 'Vehicals',
//         },
//     ],
// },
// {
//     header: 'Facilities',
//     Links: [
//         {
//             icon: <FaChartArea />,
//             text: 'MCP',
//         },
//         {
//             icon: <BsHouseDoorFill />,
//             text: 'Depot',
//         },
//     ],
// },
// ];
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
                            icon
                            <span>Today</span>
                        </div>
                        <div className="link-left-slidenav">
                            icon
                            <span>Schedule</span>
                        </div>
                        <div className="link-left-slidenav active">
                            icon
                            <span>Dispatch</span>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h3 className="title-links">Workers</h3>
                        <div className="link-left-slidenav">
                            {/* <FaRegCalendar /> */}
                            icon
                            <span>Message</span>
                        </div>
                        <div className="link-left-slidenav">
                            icon
                            <span>Message</span>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h3 className="title-links">Facilities</h3>
                        <div className="link-left-slidenav">
                            icon
                            <span>MCP</span>
                        </div>
                        <div className="link-left-slidenav">
                            icon
                            <span>Depot</span>
                        </div>
                    </div>
                </div>
            </div>
            <button className="button-back">Back</button>
        </div>
    );
};
