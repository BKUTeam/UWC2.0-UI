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
            console.log(data);
            return data;
        });
    setContent(data);
};
export function CustomPopup({ show, setShow, content }) {
    return Object.keys(content).length != 0 ? (
        <Popup open={show} modal position="right-center" onClose={() => setShow(false)}>
            {(close) => (
                <div className={cx('modal-box')}>
                    <div className={cx('modal-header')}>{content.depot_id ? 'MCP' : 'DEPOT'}</div>
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
function DepotMarker({ item }) {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState({});
    useEffect(() => {
        if (show) {
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
            {show ? <CustomPopup show={show} setShow={setShow} content={content} /> : null}
        </div>
    );
}
export default DepotMarker;
