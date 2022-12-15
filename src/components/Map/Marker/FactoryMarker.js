import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Marker.module.scss';
import { mcp } from '~/assets/icon';
import { useEffect } from 'react';
import { dataFetch } from './DepotMarker';
const cx = classNames.bind(styles);
function FactoryMarker({ item }) {
    return (
        <div className={cx('marker')}>
            <img
                className={cx('icon', 'factory')}
                src="https://img.icons8.com/clouds/100/null/manufacturing.png"
                alt="factory"
            />
        </div>
    );
}
export default FactoryMarker;
