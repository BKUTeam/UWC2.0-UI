// import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import CardStyle from './card.module.scss';
// const cx = classNames.bind(CardStyle);
function RouteCard({
    content = {
        mcps: [{}],
        distance: 0,
    },
}) {
    return (
        <div className={CardStyle.card}>
            <Row>
                <Col>
                    <div className="fw-bold" style={{ color: '#253F73' }}>
                        Số lượng MCP: {content.mcps.length}
                    </div>
                </Col>
                <Col className={CardStyle.right}>
                    <i className="fa-solid fa-circle-minus" style={{ color: '#253F73' }}></i>
                </Col>
            </Row>
            <hr />
            <Row>
                {content.mcps.map((item) => {
                    return (
                        <Row>
                            <Col>
                                <div>{item}</div>
                            </Col>
                            <Col className={CardStyle.right}>
                                <div>{content[item]}</div>
                            </Col>
                        </Row>
                    );
                })}
            </Row>
            <Row>
                <Col>
                    <span className="fst-italic opacity-50">{content.distance}</span>
                </Col>
            </Row>
        </div>
    );
}

export default RouteCard;
