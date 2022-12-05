import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import classNames from 'classnames/bind';
import styles from './Marker.module.scss';
import { mcp } from '~/assets/icon';
import { useEffect } from 'react';
import { dataFetch } from './DepotMarker';
import { CustomPopup } from './DepotMarker';
const cx = classNames.bind(styles);
function MCPPopUp({ show, setShow, content }) {
    return Object.keys(content).length != 0 ? (
        <Popup open={show} modal position="right-center" onClose={() => setShow(false)}>
            {(close) => (
                <div className={cx('modal-box')}>
                    <div className={cx('modal-header')}>{content.depot_id ? 'MCP' : 'DEPOT'}</div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-content-item')}>
                            <p>ID:</p>
                            <p>{content.id}</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>Capacity:</p>
                            <p>{content.capacity}</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>Status:</p>
                            <p>{content.state.toLowerCase()}</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>Filled: </p>
                            <p>{content.filled}%</p>
                        </div>
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
function MCPMarker({ item }) {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState({});
    useEffect(() => {
        if (show) {
            dataFetch('http://localhost:5000/api/resources/mcps/' + item.id, setContent);
        }
    }, [show]);
    return (
        <div
            className={cx('marker')}
            onClick={() => {
                setShow(true);
            }}
        >
            <img className={cx('icon', 'mcp')} src={mcp.logo}></img>
            <div className={cx('state', item.state.toLowerCase())}></div>
            {show ? <CustomPopup show={show} setShow={setShow} content={content} /> : null}
        </div>
    );
}
export default MCPMarker;
