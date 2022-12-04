import React from "react";
import { Button, Form } from "react-bootstrap";
import Styles from './header.module.scss';

function RenderToday() {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let today = new Date();
    let day = weekday[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
}    

export default function Header({handleSelect}) {
    return (
        <>
            <header>
                <div className={Styles.first}>UWC 2.0 | Destroy the world</div>
                <div className={Styles.second}>
                    <div className={Styles['left-text']}>
                        <i className="fa-solid fa-circle-info me-2 d-inline"></i>
                        <div className="d-inline">You have 7 filled MCPs</div>
                    </div>
                </div>
                <div className={Styles.third}>
                    <div className={Styles['right-text']}>
                        {/* <Button className='d-inline'>Janitor</Button> */}
                        <Form.Select aria-label="select role" className={Styles.select} onChange={handleSelect}>
                            <option defaultValue='Collector'>Collector</option>
                            <option>Janitor</option>
                        </Form.Select>
                        <div className='d-inline ms-2'>{RenderToday()}</div>
                    </div>
                </div>
            </header>
        </>
    )
}