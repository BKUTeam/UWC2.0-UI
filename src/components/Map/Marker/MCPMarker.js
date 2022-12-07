import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Marker.module.scss';
import { mcp } from '~/assets/icon';
import { useEffect } from 'react';
import { CustomPopup } from './DepotMarker';
import axios from 'axios';
const cx = classNames.bind(styles);
function MCPMarker({ item }) {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState({});
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
                    'Date created': data.date_create,
                    Area: data.area,
                    'Depot ID': data.depot_id,
                    Capacity: data.capacity,
                    Filled: data.filled,
                    State: data.state,
                });
            };
            dataFetch('http://localhost:5000/api/resources/mcps/' + item.id, setContent);
        }
    }, [show, item.id]);
    const state = cx(item.filled > 80 ? 'full' : item.filled > 50 ? 'half' : 'normal');
    return (
        <div
            className={cx('marker')}
            onClick={() => {
                setShow(true);
            }}
        >
            <div className={cx('icon', 'mcp')}>
                <svg
                    className={state}
                    width="12"
                    height="16"
                    viewBox="0 0 12 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.99999 13.8333C0.99999 14.75 1.74999 15.5 2.66666 15.5H9.33332C10.25 15.5 11 14.75 11 13.8333V3.83333H0.99999V13.8333ZM11.8333 1.33333H8.91666L8.08332 0.5H3.91666L3.08332 1.33333H0.166656V3H11.8333V1.33333Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            {/* <div className={icon_classes}></div> */}
            {show ? <CustomPopup show={show} setShow={setShow} content={content} title="MCP" /> : null}
        </div>
    );
}
export default MCPMarker;
