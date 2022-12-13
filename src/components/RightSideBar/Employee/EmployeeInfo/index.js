import classNames from 'classnames/bind';
import RouteCard from './RouteCard';
import InfoStyles from './info.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(InfoStyles);
const defaultCollectorInfo = {
    name: 'Cristiano Ronaldo',
    body: {
        ID: 1,
        Age: 37,
        Gender: 'male',
        'Citizen ID': '248149827424',
        Phone: '0983477274',
        Address: 'man utd',
        Birthplace: 'Portugal',
        'Vehicle ID': 1,
        'Depot ID': 1,
    },
    routes: [],
};
function EmployeeInfo({ content, onClick }) {
    const onBackHandle = () => {
        onClick({ show: false, id: null, firsttime: true });
    };
    // content = defaultCollectorInfo;
    return (
        <div className={cx('info-wrapper')}>
            <div className={cx('info-header')}>
                <div className={cx('back-btn')} onClick={onBackHandle}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    Quay lại
                </div>
                <div className={cx('title')}>{content.name}</div>
            </div>
            <div className={cx('info-content')}>
                {content.body
                    ? Object.keys(content.body).map((key, index) => {
                          return (
                              <div key={index} className={cx('content-item')}>
                                  <div key={index + 'left'} className={cx('bold')}>
                                      {key}
                                  </div>
                                  <div key={index + 'right'} className={cx('medium')}>
                                      {content.body[key]}
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
            {content.routes ? (
                <div className={cx('route')}>
                    <div className={cx('title')}>Đường đi thu gom đã giao</div>
                    {content.routes.map((route, index) => (
                        <RouteCard key={index} route={route} />
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default EmployeeInfo;
