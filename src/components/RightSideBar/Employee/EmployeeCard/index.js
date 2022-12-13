import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import CardStyle from './card.module.scss';
import axios, { Axios } from 'axios';
import { useContext, useState } from 'react';
import { MapContext } from '~/App';

const cx = classNames.bind(CardStyle);
const defaultCollectorInfo = {
    name: 'Cristiano Ronaldo',
    id: 1,
    vehicle_id: 1,
    depot_id: 1,
    state: 'FREE',
};

function fetchRouteForCollector(collectorId) {}

function EmployeeCard({ content = defaultCollectorInfo, onClick, type }) {
    const mapContext = useContext(MapContext);
    const handleOnClick = () => {
        // console.log(content['Employee ID']);
        onClick({
            show: true,
            id: content['Employee ID'],
            firsttime: true,
        });
    };
    const fetchRouteForCollector = () => {
        const options = {
            url: `http://localhost:5000/api/task-assignment/routes?collector-id=${content['Employee ID']}`,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        };

        axios(options).then((response) => {
            mapContext.setRoutes({
                employee_id: content['Employee ID'],
                routes: response.data.routes,
            });
            mapContext.setAssigning(true);
        });
    };

    return (
        <div className={cx('card-wrapper')}>
            <div className={content['State'] === 'FREE' ? cx('free') : cx('busy')}>
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
                {type === '1' && content['State'] === 'FREE' && (
                    <div className={cx('btn-container')}>
                        <button className={cx('btn')} onClick={fetchRouteForCollector}>
                            Assign
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmployeeCard;
