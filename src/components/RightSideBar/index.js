import { useState } from 'react';
import Collector from './Collector/index'
import Janitor from './Janitor/index'
import Styles from './RightSideNav.module.scss'

export default function RenderRightSidebar({sidebar}) {

    return (
        <div className={Styles['right-side-nav']}>
            {sidebar ? <Collector/> : <Janitor/> }
        </div>
    );
}