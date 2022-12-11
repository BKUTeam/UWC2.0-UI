import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { Wrapper as PopupWrapper } from '~/components/Header/Poper';
import { Dropdown } from 'bootstrap';

const cx = classNames.bind(styles);
const defaultFn = () => { };
function Menu({ children, items = [], onChange }) {
    const renderItem = () => {
        return items.map((item, index) => {
            return <MenuItem key={index} item={item} onClick={onChange}></MenuItem>;
        });
    };
    return (
        <Tippy
            interactive
            // visible={true}
            // disabled={true}

            placement="bottom-end"
            delay={[0, 300]}
            render={(attrs) => (
                <div className={cx('menu-box')} tabIndex={-1} {...attrs}>
                    <PopupWrapper>{renderItem()}</PopupWrapper>
                </div>
            )}
            onHide={() => { }}
        >
            {children}
        </Tippy>
    );
}
export default Menu;
