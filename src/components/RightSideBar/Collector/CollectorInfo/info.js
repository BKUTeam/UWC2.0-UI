import { Row, Col} from "react-bootstrap";
import RouteCard from './RouteCard'
import InfoStyles from './info.module.scss'
import { Button } from "react-bootstrap";

export default function RenderInfo({setShowInfo, showInfo}) {
    
    return (
        <div className={InfoStyles['info-bar']}>
            <Button className="ms-3" onClick={() => {setShowInfo(!showInfo)}}>
                <i class="fa-solid fa-angle-left me-2"></i>
                Quay lại
            </Button>
            <div className={InfoStyles.title}>Lê Thanh Tân</div>
            <Row className={InfoStyles.content}>
                <Col>
                    <div className="fw-bold">Mã:</div>
                    <div className="fw-bold">Công việc:</div>
                    <div className="fw-bold">Kho tập trung:</div>    
                    <div className="fw-bold">Phương tiện:</div>
                    <div className="fw-bold">Số điểm tập kết:</div>
                    <div className="fw-bold">Hoàn thành:</div>
                </Col>
                <Col className={InfoStyles.right}>
                    <div>Công nhân #1234</div>
                    <div>Tài xế</div>
                    <div>HCMUT</div>
                    <div>Xe tải #3</div>
                    <div>4 điểm</div>
                    <div>0 điểm</div>
                </Col>
            </Row>
            <div className={InfoStyles.title}>Đường đi thu gom đã giao</div>
            <RouteCard/>
        </div>
    )
}