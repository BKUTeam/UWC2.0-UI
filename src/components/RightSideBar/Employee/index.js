import EmployeeCard from './EmployeeCard';
import EmployeeInfo from './EmployeeInfo';
import { cloneElement, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
function ListEmployee({ content = [], type }) {
    // console.log('re-render');
    const [collector, setCollector] = useState({});
    const [janitor, setJanitor] = useState({})
    const [showInfo, setShow] = useState({ show: false, id: 0 });
    const onClickCardHandle = (show) => {
        setShow(show);
    };
    // console.log(data)
    useEffect(() => {
        if (showInfo.show && showInfo.firsttime) {
            const getData = async (id, setCollectorData, setJanitorData) => {
                const data = await axios
                    .all([
                        axios.get('http://localhost:5000/api/resources/collectors/' + id),
                        axios.get('http://localhost:5000/api/resources/collectors/route/' + id),
                        axios.get('http://localhost:5000/api/resources/janitors/' + id),
                    ])
                    .then(
                        axios.spread((res1, res2, res3) => {
                            return { collectorData: res1.data, routes: res2.data, janitorData: res3.data };
                        }),
                    )
                    .then((data) => {
                        // console.log(data.janitorData);
                        // console.log(id);
                        return data;
                    });
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
                setJanitorData({
                    name: data.janitorData.name,
                    body: {
                        ID: data.janitorData.id,
                        Age: data.janitorData.age,
                        Gender: data.janitorData.gender,
                        'Citizen ID': data.janitorData.citizen_identification,
                        Phone: data.janitorData.phone_number,
                        Address: data.janitorData.address,
                        'Birth place': data.janitorData.birthplace,
                        'Depot ID': data.janitorData.depot_id,
                        'MCP ID': data.janitorData.mcp_id
                    },
                    routes: null
                })
            };

            getData(showInfo.id, setCollector, setJanitor);
            setShow({ ...showInfo, firsttime: false });
        }
    }, [showInfo, collector, janitor]);

    console.log(showInfo.id)

    useEffect(() => {
        if (!showInfo.show) {
            setCollector({});
            setJanitor({});
        }
    }, [showInfo.show]);

    // console.log(employee)


    if (showInfo.show) {
        return <EmployeeInfo content={type === '1' ? collector : janitor} onClick={onClickCardHandle}></EmployeeInfo>;
    } else {
        return content.length > 0
            ? content.map((employeeItem, index) => {
                return (
                    <EmployeeCard
                        key={index}
                        content={type === '1' ? {
                            name: employeeItem.name,
                            'Employee ID': employeeItem.id,
                            'Vehicle ID': employeeItem.vehicle_id,
                            'Depot ID': employeeItem.depot_id,
                            'State': employeeItem.state
                        } : {
                            name: employeeItem.name,
                            'Employee ID': employeeItem.id,
                            'Depot ID': employeeItem.depot_id,
                            'MCP ID': employeeItem.mcp_id,
                            // 'State': employeeItem.state
                        }}
                        onClick={onClickCardHandle}
                    ></EmployeeCard>
                );
            })
            : null;
    }
}

export default ListEmployee;
