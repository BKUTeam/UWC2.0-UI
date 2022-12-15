import classnames from 'classnames/bind';
import EmployeeCard from '~/components/RightSideBar/Employee/EmployeeCard';
import EmployeeInfo from '~/components/RightSideBar/Employee/EmployeeInfo';
import styles from '../RightSideNav.module.scss';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const cx = classnames.bind(styles);
function JanitorList({ content }) {
    console.log(content);
    // const mapContext = useContext(MapContext);
    // const content = mapContext.employees;
    const [janitor, setJanitor] = useState({});
    const [showInfo, setShow] = useState({ show: false, id: 0, firsttime: true });
    const onClickCardHandle = (show) => {
        setShow(show);
    };
    useEffect(() => {
        if (showInfo.show && showInfo.firsttime) {
            const getData = async (id, setJanitorData) => {
                await axios
                    .get('http://localhost:5000/api/resources/janitors/' + id)
                    .then((res) => res.data)
                    .then((data) => {
                        setJanitorData({
                            name: data.name,
                            body: {
                                ID: data.id,
                                Age: data.age,
                                Gender: data.gender,
                                'Citizen ID': data.citizen_identification,
                                Phone: data.phone_number,
                                Address: data.address,
                                'Birth place': data.birthplace,
                                'Depot ID': data.depot_id,
                                'MCP ID': data.mcp_id,
                            },
                            routes: [],
                        });
                    });
            };
            getData(showInfo.id, setJanitor);
            setShow({ ...showInfo, firsttime: false });
        }
    }, [showInfo, janitor]);

    useEffect(() => {
        if (!showInfo.show) {
            setJanitor({});
        }
    }, [showInfo.show]);
    if (showInfo.show) {
        return <EmployeeInfo content={janitor} onClick={onClickCardHandle}></EmployeeInfo>;
    } else {
        return (
            <div className={cx('content-list')}>
                {content.length > 0
                    ? content.map((janitor, index) => {
                          return (
                              <EmployeeCard
                                  key={index}
                                  content={{
                                      name: janitor.name,
                                      'Employee ID': janitor.id,
                                      'Depot ID': janitor.depot_id,
                                      'MCP ID': janitor.mcp_id,
                                      // 'State': employeeItem.state
                                  }}
                                  onClick={onClickCardHandle}
                              ></EmployeeCard>
                          );
                      })
                    : null}
            </div>
        );
    }
}

export default JanitorList;
