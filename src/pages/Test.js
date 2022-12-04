import Header from "~/components/Header/Header"
import { Row, Col} from "react-bootstrap"
import RightSideBar from "~/components/RightSideBar/Collector"
import Styles from './styles.module.scss'
import clsx from "clsx"

export default function Test() {
    return (
        <>
            <Row className={Styles.row}>
                <Col sm={2}>
                    <h1> This is left side bar </h1>
                </Col>
                <Col sm={10}>
                    {/* <Row className={Styles.header}>
                        <Header/>
                    </Row> */}
                    <Header/>
                    <Row className={Styles.row}>
                        <Col lg={8}>
                            <h1>This is map</h1>
                        </Col>
                        <Col lg={4} className={clsx(Styles['right-sidebar'])}>
                            <h1>This is right side bar</h1>
                            <RightSideBar/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}