import classnames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EmployeeInfo from '../Employee/EmployeeInfo/index';
import EmployeeCard from '../Employee/EmployeeCard/index';

import styles from '../RightSideNav.module.scss';

const cx = classnames.bind(styles);
function CollectorList({ content }) {
    const [collector, setCollector] = useState({});
    const [showInfo, setShow] = useState({ show: false, id: -1, firsttime: true });
    const onClickHandle = (show) => {
        setShow(show);
    };
    useEffect(() => {
        if (showInfo.show && showInfo.firsttime) {
            const getData = async (id, setCollectorData) => {
                await axios
                    .all([
                        axios.get('http://localhost:5000/api/resources/collectors/' + id),
                        axios.get('http://localhost:5000/api/resources/collectors/route/' + id),
                    ])
                    .then(
                        axios.spread((res1, res2) => {
                            console.log(res1, res2);
                            return { collectorData: res1.data, routes: res2.data };
                        }),
                    )
                    .then((data) => {
                        setCollectorData({
                            name: data.collectorData.name,
                            body: {
                                ID: data.collectorData.id,
                                Age: data.collectorData.age,
                                Gender: data.collectorData.gender,
                                'Citizen ID': data.collectorData.citizen_identification,
                                Phone: data.collectorData.phone_number,
                                Address: data.collectorData.address,
                                'Birth place': data.collectorData.birthplace,
                                'Vehicle ID:': data.collectorData.vehicle_id,
                                'Depot ID': data.collectorData.depot_id,
                                'Vehicle Capacity': data.collectorData.vehicle_cap,
                            },
                            routes: data.routes || [],
                        });
                    });
            };
            getData(showInfo.id, setCollector);
            setShow({ ...showInfo, firsttime: false });
        }
    }, [showInfo, collector]);
    useEffect(() => {
        if (!showInfo.show) {
            setCollector({});
        }
    }, [showInfo.show]);
    // console.log(collector);
    const renderCard = (items = []) => {
        return items.map((item, index) => {
            return (
                <EmployeeCard
                    key={index}
                    content={{
                        name: item.name,
                        'Employee ID': item.id,
                        'Vehicle ID': item.vehicle_id,
                        'Depot ID': item.depot_id,
                        State: item.state,
                    }}
                    onClick={onClickHandle}
                    type="1"
                />
            );
        });
    };
    if (showInfo.show) {
        return <EmployeeInfo content={collector} onClick={onClickHandle}></EmployeeInfo>;
    } else {
        return <div className={cx('content-list')}>{content.length > 0 ? renderCard(content) : null}</div>;
    }
}

export default CollectorList;
