import { useEffect, useState } from "react"
import { Spinner, Col, Row, Image, Badge, Form, Button } from 'react-bootstrap'
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Apis, { endpoint } from "../configs/Apis"
import cookies from 'react-cookies'
import { Comment, Icon } from 'semantic-ui-react'
import ReactTimeAgo from 'react-time-ago'

export default function LessonDetail() {

    const [lesson, setLesson] = useState(null)
    const [comment, setComment] = useState([])
    const [addComment, setAddComment] = useState([])
    const user = useSelector(state => state.user.user)
    const [change, setChange] = useState(0)

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
        let loadComments = async () => {
            try {
                let res = await Apis.get(endpoint['comment'](lessonId))
                setComment(res.data)
                console.log(res)
            }
            catch (err) {
                console.error(err)
            }
        }
        loadLesson()
        loadComments()
    }, [change])

    const submit = async (event) => {
        event.preventDefault()
        try {
            const res = await Apis.post(endpoint['add-comment'](lessonId), {
                'content': addComment,
            }, {
                headers: {
                    'Authorization': `Bearer ${cookies.load('access_token')}`
                }
            })
            comment.unshift(res.data)
            setComment(comment)
            setChange(comment.length + 1)
        }
        catch (err) {
            console.error(err)
        }
    }

    let path = <> <Link to='/login'>Hãy đang nhập</Link></>

    if (user !== undefined && user !== null)
        path = <>
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} value={addComment} onChange={(event) => setAddComment(event.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>

    if (lesson === null)
        return (
            <Spinner animation="grow" />
        )

    return (
        <>
            <h1 className="text-center text-danger mb-5">Chi tiết bài học</h1>
            <Row>
                <Col md={5} xs={12}>
                    <Image src={lesson.image} rounded fluid />
                </Col>
                < Col md={7} xs={12} className="ml-4">
                    <div className="p-5">
                        <h2>{lesson.subject}</h2>
                        <p>Ngay tao: {lesson.created_date}</p>
                        <p>
                            {lesson.tag.map(t => <Badge bg="secondary">{t.name}</Badge>)}
                        </p>
                    </div>
                </Col>
            </Row>
            <hr />
            <div>
                {lesson.content}
            </div>
            <hr />
            <h3>Comment</h3>
            {path}
            <br />
            {comment.map(c =>
                <Row>
                    <Comment.Group>
                        <Comment>
                            {c.creator.avatar !== undefined && c.creator.avatar !== null? <Comment.Avatar as='a' src={c.creator.avatar} /> : <p>ok</p>}
                            <Comment.Content>
                                <Comment.Author>{c.creator.username}</Comment.Author>
                                <Comment.Metadata>
                                    <ReactTimeAgo date={c.created_date} locale="en-US" />
                                    <div>
                                        <Icon name='star' />
                                    </div>
                                </Comment.Metadata>
                                <Comment.Text className="p-3">
                                    <strong>
                                        {c.content}
                                    </strong>
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>
                        <br />
                    </Comment.Group>
                </Row>
            )
            }

        </>
    )
}