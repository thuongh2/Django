import { useEffect, useState } from "react"
import { Spinner, Col, Row, Image, Badge } from 'react-bootstrap'
import { useParams } from "react-router"
import Apis, { endpoint } from "../configs/Apis"

export default function LessonDetail() {

    const [lesson, setLesson] = useState(null)

    let { lessonId } = useParams()

    useEffect(() => {
        let loadLesson = async () => {
            try {
                let res = await Apis.get(endpoint['lesson-detail'](lessonId))
                setLesson(res.data)
            }
            catch (err) {
                console.error(err)
            }
        }
        loadLesson()
    }, [])

    if (lesson === null)
        return (
            <Spinner animation="grow" />
        )

    return (
        <>
            <h1 className="text-center text-danger">Chi tiet mot bai hoc</h1>
            <Row>
                <Col md={4} xs={12}>
                    <Image src={lesson.image} rounded fluid />
                </Col>
                < Col md={8} xs={12}>
                    <h2>{lesson.subject}</h2>
                    <p>Ngay tao: {lesson.created_date}</p>
                    <p>
                        {lesson.tag.map(t => <Badge bg="secondary">{t.name}</Badge>)}
                    </p>
                </Col>
            </Row>
            <hr />
            <div>
                {lesson.content}
            </div>
        </>
    )
}