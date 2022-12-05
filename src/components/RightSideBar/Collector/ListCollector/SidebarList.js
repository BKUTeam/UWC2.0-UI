import CollectorCard from './CollectorCard';
import CollectorInfo from '../CollectorInfo/info';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const getCollector = async (id, collectorData, setCollectorData) => {
    const info = await axios('http://localhost:5000/api/resources/collectors/' + id)
        .then((res) => res.data)
        .then((data) => {
            return data;
        });
    setCollectorData({ ...collectorData, name: info.name || 'Ronaldo', body: info.body || info });
    const routes = await axios('http://localhost:5000/api/resources/collectors/route/' + id)
        .then((res) => res.data)
        .then((data) => {
            return data;
        });
    setCollectorData({ ...collectorData, routes: routes.routes });
};

export default function RenderSidebarList({ collectors = [] }) {
    const [collector, setCollector] = useState({});
    const [showInfo, setShow] = useState({ show: false, id: 0 });
    const onClickCollectorCardHandle = (show) => {
        setShow(show);
    };
    useEffect(() => {
        if (showInfo.show) {
            getCollector(showInfo.id, collector, setCollector);
        }
    }, [showInfo]);
    if (showInfo.show) {
        return <CollectorInfo content={collector} onClick={onClickCollectorCardHandle}></CollectorInfo>;
    } else {
        return collectors.length > 0
            ? collectors.map((collectorItem, index) => {
                  return (
                      <CollectorCard
                          key={index}
                          content={{
                              name: collectorItem.name,
                              'Collector ID': collectorItem.id,
                              'Vehicle ID': collectorItem.vehicle_id,
                              'Depot ID': collectorItem.depot_id,
                          }}
                          onClick={onClickCollectorCardHandle}
                      ></CollectorCard>
                  );
              })
            : null;
    }
}
