import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import classNames from 'classnames/bind';
import styles from './Marker.module.scss';
import { mcp } from '~/assets/icon';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
function MCPPopUp({ show, setShow, id }) {
    const [content, setContent] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const url = `http://localhost:5000/api/resources/mcps/` + id;
        const dataFetch = async () => {
            const data = await axios
                .get(url)
                .then((res) => res.data)
                .then((data) => {
                    return data;
                });
            setContent(data);
            setLoaded(true);
        };
        dataFetch();
    }, []);
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
    return (
        <div
            className={cx('marker')}
            onClick={() => {
                setShow(true);
            }}
        >
            <img className={cx('icon', 'mcp')} src={mcp.logo}></img>
            <div className={cx('state', item.state.toLowerCase())}></div>
            {show ? <MCPPopUp show={show} setShow={setShow} id={item.id} /> : null}
        </div>
    );
}
export default MCPMarker;
