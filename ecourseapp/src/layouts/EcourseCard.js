import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function EcourseCard(props) {

    let path = `/courses/${props.obj.id}/lesson/`

    return (
        <Col md={4} xs={12}>
            <Card >
                <Link to={path}>
                <Card.Img variant="top" style={{ height: '18rem' }} src={props.obj.image} />
                <Card.Body>
                    <Card.Title>{props.obj.subject}</Card.Title>
                    <Card.Text>
                        {props.obj.created_date}
                    </Card.Text>
                </Card.Body>
                </Link>
            </Card>
        </Col>
    )
}