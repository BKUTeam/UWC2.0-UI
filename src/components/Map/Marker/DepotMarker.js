import axios from 'axios';
import Popup from 'reactjs-popup';
import classNames from 'classnames/bind';
import styles from './Marker.module.scss';
import { depot } from '~/assets/icon';
import { useState } from 'react';
import { useEffect } from 'react';
const cx = classNames.bind(styles);
export const dataFetch = async (url, setContent) => {
    const data = await axios
        .get(url)
        .then((res) => res.data)
        .then((data) => {
            return data;
        });
    setContent(data);
};
export function CustomPopup({ show, setShow, content, title }) {
    return Object.keys(content).length !== 0 ? (
        <Popup open={show} modal position="right-center" onClose={() => setShow(false)}>
            {(close) => (
                <div className={cx('modal-box')}>
                    <div className={cx('modal-header')}>{title}</div>
                    <div className={cx('modal-content')}>
                        {Object.keys(content).map((key) => {
                            return (
                                <div key={key} className={cx('modal-content-item')}>
                                    <p>{key}</p>
                                    <p>{content[key]}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className={cx('actions')}>
                        <button
                            className={cx('modal-btn')}
                            onClick={() => {
                                close();
                            }}
                        >
                            Close modal
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    ) : null;
}
const defaultDepotPopupContent = {
    ID: 0,
    'Date created': '16/08/2005',
    Area: 300,
    MCPs: 10,
    'Full MCPs': 3,
    'In route MCPs': 2,
    Workers: 3,
    Collectors: 2,
    Janitors: 1,
    Vehicle: 2,
};
function DepotMarker({ item }) {
    // console.log('Render depot');
    const [show, setShow] = useState(false);
    const [content, setContent] = useState(defaultDepotPopupContent);
    useEffect(() => {
        if (show) {
            const dataFetch = async (url, setContent) => {
                const data = await axios
                    .get(url)
                    .then((res) => res.data)
                    .then((data) => {
                        return data;
                    });
                setContent({
                    ID: data.id,
                    'Date created': data.date_created,
                    Area: data.area,
                    MCPs: data.mcps_amount,
                    'Full MCPs': data.full_mcps_amount,
                    'In route MCPs': data.in_route_mcps_amount,
                    Workers: data.worker_amount,
                    Collectors: data.collector_amount,
                    Janitors: data.janitor_amount,
                    Vehicle: data.vehical_amount,
                });
            };
            dataFetch('http://localhost:5000/api/resources/depots/' + item.id, setContent);
        }
    }, [show]);
    return (
        <div
            className={cx('marker')}
            onClick={() => {
                setShow(true);
            }}
        >
            <img className={cx('icon', 'mcp')} src={depot.logo} alt="depot"></img>
            {show ? <CustomPopup show={show} setShow={setShow} content={content} title="Depot" /> : null}
        </div>
    );
}
export default DepotMarker;
