import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import CardStyle from './card.module.scss';

const cx = classNames.bind(CardStyle);
const defaultCollectorInfo = {
    name: 'Cristiano Ronaldo',
    id: 1,
    vehicle_id: 1,
    depot_id: 1,
};
function EmployeeCardComponent({ content = defaultCollectorInfo, onClick }) {
    const handleOnClick = () => {
        onClick({
            show: true,
            id: content['Collector ID'],
            firsttime: true,
        });
    };
    return (
        <div className={cx('card-wrapper')}>
            <div className={cx('card-header')} onClick={handleOnClick}>
                <div className={cx('bold')}>{content.name}</div>
                <div className={cx('card-back-btn')}>
                    <FontAwesomeIcon icon={faCircleChevronRight} />
                </div>
            </div>
            <div className={cx('card-content')}>
                {Object.keys(content).map((key) => {
                    return key === 'name' ? null : (
                        <div key={key} className={cx('card-content-item')}>
                            <div className={cx('bold')}>{key}:</div>
                            <div className={cx('medium')}>{content[key]}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default EmployeeCardComponent;
