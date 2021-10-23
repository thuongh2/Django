import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'

export default function EcourseCard(props) {

    let path = `/courses/${props.obj.id}/lesson/`
    if (props.type === 'lesson')
        path = `/lesson/${props.obj.id}/`
    return (
        <Col md={3} xs={12}>
            <Card className='mt-2 mb-4' style={{'width': '85%' }}>
                <Link to={path}>
                <Card.Img variant="top" style={{ height: '18rem' }} src={props.obj.image} />
                <Card.Body>
                    <Card.Title>{props.obj.subject}</Card.Title>
                    <Card.Text>
                        <ReactTimeAgo date={props.obj.created_date} locale="en-US"/>
                    </Card.Text>
                </Card.Body>
                </Link>
            </Card>
        </Col>
    )
}