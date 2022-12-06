import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Styles from './header.module.scss';
import classNames from 'classnames/bind';
import Menu from './Poper/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { MENU_ITEMS } from '~/App';
const cx = classNames.bind(Styles);
function RenderToday() {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    let today = new Date();
    let day = weekday[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
}

const defaultFn = () => {};
export default function Header({ currentView = { title: 'Janitor', id: 0 }, onChangeEmployee = defaultFn }) {
    return (
        <>
            <header>
                <div className={cx('first')}>UWC 2.0 | Destroy the world</div>
                <div className={cx('second')}>
                    <div className={cx('noti')}>
                        <FontAwesomeIcon className={cx('noti-icon')} icon={faCircleInfo} />
                        <div className={cx('noti-title')}>You have 7 filled MCPs</div>
                    </div>
                </div>
                <div className={cx('third')}>
                    <div className={cx('actions')}>
                        <Menu items={MENU_ITEMS} onChange={onChangeEmployee}>
                            <div className={cx('choose-btn')}>
                                {currentView.title}
                                <div className={cx('icons')}>
                                    <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon>
                                </div>
                            </div>
                        </Menu>
                        <div className={cx('date')}>{RenderToday()}</div>
                    </div>
                </div>
            </header>
        </>
    );
}
