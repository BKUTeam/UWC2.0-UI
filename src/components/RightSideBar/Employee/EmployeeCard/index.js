import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import CardStyle from './card.module.scss';
import axios, { Axios } from 'axios';
import { useContext } from 'react';
import { MapContext } from '~/App';

const cx = classNames.bind(CardStyle);
const defaultCollectorInfo = {
    name: 'Cristiano Ronaldo',
    id: 1,
    vehicle_id: 1,
    depot_id: 1,
};

function fetchRouteForCollector(collectorId) {}

function EmployeeCardComponent({ content = defaultCollectorInfo, onClick }) {
    const mapContext = useContext(MapContext);

    const handleOnClick = () => {
        onClick({
            show: true,
            id: content['Collector ID'],
            firsttime: true,
        });
    };

    const fetchRouteForCollector = () => {
        const options = {
            url: `http://localhost:5000/api/task-assignment/routes?collector-id=${content['Collector ID']}`,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        };

        axios(options).then((response) => {
            mapContext.setRoutes(response.data.routes);
        });
    };

    return (
        <div className={cx('card-wrapper')}>
            <div className={cx('card-header')} onClick={handleOnClick}>
                <div className={cx('bold')}>{content.name}</div>
                <div className={cx('card-back-btn')}>
                    <FontAwesomeIcon icon={faCircleChevronRight} />
                </div>
            </div>
            <div className={cx('card-content')}>
                {Object.keys(content).map((key) => {
                    return key === 'name' ? null : (
                        <div key={key} className={cx('card-content-item')}>
                            <div className={cx('bold')}>{key}:</div>
                            <div className={cx('medium')}>{content[key]}</div>
                        </div>
                    );
                })}
            </div>
            <button onClick={fetchRouteForCollector}>Assign</button>
        </div>
    );
}

export default EmployeeCardComponent;
