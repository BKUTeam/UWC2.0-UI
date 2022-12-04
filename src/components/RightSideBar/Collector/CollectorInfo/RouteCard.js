import { Col, Row } from 'react-bootstrap';
import CardStyle from './card.module.scss';

function RenderCard() {
    return (
        <div className={CardStyle.card}>
            <Row>
                <Col>
                    <div className="fw-bold" style={{ color: '#253F73' }}>
                        Thu gom 2 điểm
                    </div>
                </Col>
                <Col className={CardStyle.right}>
                    <i className="fa-solid fa-circle-minus" style={{ color: '#253F73' }}></i>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <div>523 Tô Hiến Thành</div>
                </Col>
                <Col className={CardStyle.right}>
                    <div>Quận 10</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>523 Tô Hiến Thành</div>
                </Col>
                <Col className={CardStyle.right}>
                    <div>Quận 10</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span className="fst-italic opacity-50">7km</span>
                </Col>
            </Row>
        </div>
    );
}

function RenderCardList() {
    return (
        <>
            <RenderCard />
            <RenderCard />
            <RenderCard />
        </>
    );
}

export default RenderCardList;
