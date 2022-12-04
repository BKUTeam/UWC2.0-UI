import { Col, Row, Button } from 'react-bootstrap';
import CardStyle from './card.module.scss'
import { useState } from "react";
import CollectorInfo from '../../Collector/CollectorInfo/info'

function RenderCard({completed}) {
    const [showInfo, setShowInfo] = useState(false);
    const [showList, setShowList] = useState(true);

    return (
        <>
            {
                showList &&
                <div className={completed ? CardStyle['completed-card'] : CardStyle['uncompleted-card']}>
                <Row>
                    <Col>
                        <div>Lê Thanh Tân</div>
                    </Col>
                    <Col className={CardStyle.right}>
                        <span>Bận</span>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <div className='fw-bold'>Mã:</div>
                        <div className='fw-bold'>Kho tập trung:</div>
                        <div className='fw-bold'>Mã điểm tập kết:</div>
                    </Col>
                    <Col  className={CardStyle.right}>
                        <div>Công nhân #1234</div>
                        <div>HCMUT</div>
                        <div>Điểm tập kết #1</div>
                    </Col>
                </Row>
            </div>
            }
            <div>
                {
                    showInfo && 
                    <>
                        <Button className='ms-3 mb-3' onClick={() => {setShowInfo(!showInfo); setShowList(!showList)}}>
                            <i className="fa-solid fa-angle-left me-2"></i>
                            Quay lại
                        </Button>
                        <CollectorInfo/>
                    </>
                }
            </div>
        </>  
        
    );
}

export default RenderCard;