import { useEffect, useState } from "react"
import { Row } from 'react-bootstrap'
import { useParams } from "react-router"
import Apis, { endpoint } from "../configs/Apis"
import EcourseCard from "../layouts/EcourseCard"
import { SpinnerItem } from '../layouts/Spinner'
export default function Lesson() {

    const [lesson, setLesson] = useState([])
    const { courseId } = useParams() // hung ket qua tu url

    useEffect(() => {
        let loadLesson = async () => {
            try {
                let res = await Apis.get(endpoint['lessons'](courseId))
                setLesson(res.data)
            }
            catch (err) {
                console.error(err)
            }
        }
        loadLesson()
    }, [])

    console.info(lesson)

    let path = <SpinnerItem/>
        

    if (lesson.length !== 0) {
        path =  lesson.map(c => <EcourseCard key={c.id} obj={c} type='lesson' />)
    }

    return (
        <>
            <h1 className="text-center text-danger">Danh muc bai hoc cua khoa hoc</h1>
            <Row>
                {path}
            </Row>
        </>
    )
}