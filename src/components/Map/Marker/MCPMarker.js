import Popup from 'reactjs-popup';
import classNames from 'classnames/bind';
import styles from './Marker.module.scss';
import { mcp } from '~/assets/icon';

const cx = classNames.bind(styles);
function MCPMarker({ item, content, onClickHandle }) {
    const url = `http://localhost:5000/api/resources/mcps/` + item.id;
    return (
        <Popup
            trigger={
                <div className={cx('marker')}>
                    <img className={cx('icon', 'mcp')} src={mcp.logo}></img>
                    <div className={cx('state', item.state.toLowerCase())}></div>
                </div>
            }
            modal
            position="right-center"
        >
            {(close) => (
                <div className={cx('modal-box')}>
                    <div className={cx('modal-header')}>{item.depot_id ? 'MCP' : 'DEPOT'}</div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-content-item')}>
                            <p>ID:</p>
                            <p>{item.id}</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>Capacity:</p>
                            <p>{item.capacity}</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>Status:</p>
                            <p>{item.state.toLowerCase()}</p>
                        </div>
                        <div className={cx('modal-content-item')}>
                            <p>Filled: </p>
                            <p>{item.filled}%</p>
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
export default MCPMarker;
