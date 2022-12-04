import axios from 'axios';
import Popup from 'reactjs-popup';
import classNames from 'classnames/bind';
import styles from './Marker.module.scss';
import { depot } from '~/assets/icon';
import { useState } from 'react';
import { useEffect } from 'react';
const cx = classNames.bind(styles);
function DepotPopup({ show, setShow, id }) {
    const [content, setContent] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const dataFetch = async () => {
            const url = 'http://localhost:5000/api/resources/mcps/' + id;
            const data = await axios
                .get(url)
                .then((res) => res.data)
                .then((data) => {
                    console.log(data);
                    return data;
                });
            setLoaded(true);
            setContent(data);
        };
        dataFetch();
    }, []);
    return Object.keys(content).length != 0 ? (
        <Popup open={show} modal position="right-center" onClose={() => setShow(false)}>
            {(close) => (
                <div className={cx('modal-box')}>
                    <div className={cx('modal-header')}>{'DEPOT'}</div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-content-item')}>
                            <p>Capacity</p>
                            <p>{content.capacity}</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>Filled</p>
                            <p>{content.filled}</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>title:</p>
                            <p>abc</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>title:</p>
                            <p>abc</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>title:</p>
                            <p>abc</p>
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
function DepotMarker({ item }) {
    const [show, setShow] = useState(false);

    return (
        <div
            className={cx('marker')}
            onClick={() => {
                setShow(true);
            }}
        >
            <img className={cx('icon', 'mcp')} src={depot.logo} alt="depot"></img>
            {show ? <DepotPopup show={show} setShow={setShow} id={item.id} /> : null}
        </div>
    );
}
export default DepotMarker;
