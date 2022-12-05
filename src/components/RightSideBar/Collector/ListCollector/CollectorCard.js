import { Col, Row, Button } from 'react-bootstrap';
import CardStyle from './card.module.scss';
import { useState } from 'react';
import CollectorInfo from '../CollectorInfo/info';

function RenderCard({ showInfo, setShowInfo, completed }) {
    var ID = 1;

    return (
        <>
            {showList && (
                <div className={CardStyle.card}>
                    <Row>
                        <Col>
                            <div>Lê Thanh Tânnn</div>
                        </Col>
                        <Col className={CardStyle.right}>
                            <i
                                onClick={() => {
                                    setShowInfo(!showInfo);
                                    setShowList(!showList);
                                }}
                                class="fa-solid fa-circle-chevron-right"
                            ></i>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <div className="fw-bold">Mã phương tiện:</div>
                            <div className="fw-bold">Hoàn thành:</div>
                        </Col>
                        <Col className={CardStyle.right}>
                            <div>Xe tải #3</div>
                            <div>2/3 Lộ trình</div>
                        </Col>
                    </Row>
                </div>
            )}
            <div>
                {showInfo && (
                    <>
                        <Button
                            className="ms-3 mb-3"
                            onClick={() => {
                                setShowInfo(!showInfo);
                                setShowList(!showList);
                            }}
                        >
                            <i className="fa-solid fa-angle-left me-2"></i>
                            Quay lại
                        </Button>
                        <CollectorInfo />
                    </>
                )}
            </div>
        </>
    );
}

export default RenderCard;
