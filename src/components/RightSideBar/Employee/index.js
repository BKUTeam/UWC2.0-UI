import EmployeeCard from './EmployeeCard';
import EmployeeInfo from './EmployeeInfo';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
function ListEmployee({ content = [] }) {
    // console.log('re-render');
    const [collector, setCollector] = useState({});
    const [showInfo, setShow] = useState({ show: false, id: 0 });
    const onClickCollectorCardHandle = (show) => {
        setShow(show);
    };
    useEffect(() => {
        if (showInfo.show && showInfo.firsttime) {
            const getData = async (id, setCollectorData) => {
                const data = await axios
                    .all([
                        axios.get('http://localhost:5000/api/resources/collectors/' + id),
                        axios.get('http://localhost:5000/api/resources/collectors/route/' + id),
                    ])
                    .then(
                        axios.spread((res1, res2) => {
                            return { data: res1.data, routes: res2.data };
                        }),
                    )
                    .then((data) => {
                        // console.log(data);
                        return data;
                    });
                setCollectorData({
                    name: data.data.name,
                    body: {
                        ID: data.data.id,
                        Age: data.data.age,
                        Gender: data.data.age,
                        'Citizen ID': data.data.citizen_identification,
                        Phone: data.data.phone_number,
                        Address: data.data.address,
                        'Birth place': data.data.birthplace,
                        'Vehicle ID:': data.data.vehicle_id,
                        'Depot ID': data.data.depot_id,
                        'Vehicle Capacity': data.data.vehicle_cap,
                    },
                    routes: data.routes || [],
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
    if (showInfo.show) {
        return <EmployeeInfo content={collector} onClick={onClickCollectorCardHandle}></EmployeeInfo>;
    } else {
        return content.length > 0
            ? content.map((collectorItem, index) => {
                  return (
                      <EmployeeCard
                          key={index}
                          content={{
                              name: collectorItem.name,
                              'Collector ID': collectorItem.id,
                              'Vehicle ID': collectorItem.vehicle_id,
                              'Depot ID': collectorItem.depot_id,
                          }}
                          onClick={onClickCollectorCardHandle}
                      ></EmployeeCard>
                  );
              })
            : null;
    }
}

export default ListEmployee;
