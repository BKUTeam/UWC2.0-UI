import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './card.module.scss';
import axios from 'axios';
import { useContext, useState } from 'react';
import { MapContext } from '~/App';
import OptionModal from '~/utils/modal';
import { handleGetRouteByMCPPool, handelGetRouteByReduceThreshhold } from '~/components/Footer/Route/index';

const cx = classNames.bind(styles);
const defaultCollectorInfo = {
    name: 'Cristiano Ronaldo',
    id: 1,
    vehicle_id: 1,
    depot_id: 1,
    state: 'FREE',
};

function EmployeeCard({ content = defaultCollectorInfo, onClick, type }) {

    const [renderOptionModal, setRenderOptionModal] = useState(false)
    const [modalData, setModalData] = useState({})

    const mapContext = useContext(MapContext);
    const handleOnClick = () => {
        onClick({
            show: true,
            id: content['Employee ID'],
            firsttime: true,
        });
    };
    const fetchRouteForCollector = () => {
        mapContext.setRoutes({
            employee: content,
            routes: [],
        });
        mapContext.setAssigning(true);
        const options = {
            url: `http://localhost:5000/api/task-assignment/routes?collector-id=${content['Employee ID']}`,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        };

        axios(options).then((response) => {

            let has_valid_route = false

            console.log(response.data)
            const routes = response.data.routes
            for (let i = 0; i < routes.length; i++) {
                if (!routes[i].listNode) {
                    continue
                }

                let loaded = 0
                for (let j = 0; j < routes[i].length; j++) {
                    loaded += routes[i][j].loaded
                }

                if (loaded >= routes.vehicle_cap * 2 * 0.7) {
                    has_valid_route = true
                    break
                }
            }

            if (!has_valid_route) {
                const modalData = {
                    title: "Warning",
                    message: "Dont have enough expected routes!",
                    list_button_title: ["MCP Pool", "Low Threshold"],
                    list_button_callback: [handleGetRouteByMCPPool, handelGetRouteByReduceThreshhold],
                    setRender: setRenderOptionModal,
                    MapContext: mapContext
                }
                setModalData(modalData)
                setRenderOptionModal(true)
            }

            mapContext.setRoutes({
                employee: content,
                routes: response.data.routes,
            });
            mapContext.setAssigning(false);
        });
    };
    return (
        <>
            {renderOptionModal && <OptionModal {...modalData} />}

            <div className={cx('card-wrapper')}>
                <div className={content['State'] === 'BUSY' ? cx('busy') : cx('free')}>
                    <div className={cx('card-header')} onClick={handleOnClick}>
                        <div className={cx('bold')}>{content.name}</div>
                        <div className={cx('card-back-btn')}>
                            <FontAwesomeIcon icon={faCircleChevronRight} />
                        </div>
                    </div>
                    <div className={cx('card-content')}>
                        {Object.keys(content).map((key) => {
                            return key === 'name' || key === 'vehicle_cap' ? null : (
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
        </>
    );
}

export default EmployeeCard;
