import { useState } from "react"
import {Row} from 'react-bootstrap'
import EcourseCard from "../layouts/EcourseCard"

export default function Lesson() {

    const [lesson, setLesson] = useState([])

    

    return (
        <>
            <h1 className="text-center text-danger">Danh muc bai hoc cua khoa hoc</h1>
            <Row>
                {lesson.map(c => <EcourseCard obj={c} />)}
            </Row>
        </>
    )
}