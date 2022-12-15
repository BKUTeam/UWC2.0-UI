import classnames from 'classnames/bind';

import CollectorList from './CollectorList/index';
import JanitorList from './JanitorList/index';
import { useState } from 'react';
import { MapContext } from '~/App';
import { useEffect, useContext } from 'react';
import styles from './RightSideNav.module.scss';

const cx = classnames.bind(styles);
function ListEmployee({}) {
    const mapContext = useContext(MapContext);
    const [collectors, setCollectors] = useState({ free: [], busy: [] });
    const [janitors, setJanitors] = useState([]);
    const [empState, setempState] = useState('free');
    useEffect(() => {
        if (!mapContext.assigning) {
            console.log('re-render');
            if (mapContext.currentView.id == 1) {
                let busyCollectors = [];
                let freeCollectors = [];
                mapContext.employees.forEach((item, index) => {
                    // console.log(item);
                    if (item.state === 'BUSY') {
                        busyCollectors.push(item);
                    } else {
                        freeCollectors.push(item);
                    }
                });
                setCollectors({ free: freeCollectors, busy: busyCollectors });
            } else if (mapContext.currentView.id == 0) {
                setJanitors(mapContext.employees);
            }
        }
    }, [mapContext.employees, empState, mapContext.assigning]);
    const changeEmpStateHandle = () => {
        console.log('changeState');
        setempState(empState == 'free' ? 'busy' : 'free');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>{mapContext.currentView.title}</div>
                <div className={cx('actions')} onClick={changeEmpStateHandle}>
                    <div className={cx('actions-btn')}>{empState.toUpperCase()}</div>
                </div>
            </div>
            <div className={cx('content-wrapper')}>
                {mapContext.currentView.id == 1 ? (
                    <CollectorList content={collectors[empState]}></CollectorList>
                ) : (
                    <JanitorList content={janitors}></JanitorList>
                )}
            </div>
        </div>
    );
}

export default ListEmployee;
