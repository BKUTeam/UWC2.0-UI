import Popup from 'reactjs-popup';
import classNames from 'classnames/bind';
import styles from './Marker.module.scss';
import { depot } from '~/assets/icon';
const cx = classNames.bind(styles);
function DepotMarker({ item }) {
    return (
        <Popup
            // className={cx('popup')}
            // className=""
            trigger={
                <div className={cx('marker')}>
                    <img className={cx('icon', 'mcp')} src={depot.logo} alt="depot"></img>
                </div>
            }
            modal
            position="right-center"
        >
            {(close) => (
                <div className={cx('modal-box')}>
                    <div className={cx('modal-header')}>{'DEPOT'}</div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-content-item')}>
                            <p>Capacity</p>
                            <p>{item.capacity}</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>Filled</p>
                            <p>{item.filled}</p>
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
    );
}
export default DepotMarker;
