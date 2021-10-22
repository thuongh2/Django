import { useEffect, useState } from "react"
import {Row} from 'react-bootstrap'
import { useParams } from "react-router"
import Apis, { endpoint } from "../configs/Apis"
import EcourseCard from "../layouts/EcourseCard"

export default function Lesson() {

    const [lesson, setLesson] = useState([])
    const { courseId } = useParams() // hung ket qua tu url

    useEffect(()=>{
        let loadLesson = async () => {
            try{
            let res = await Apis.get(endpoint['lessons'](courseId)) 
            setLesson(res.data)
            }
            catch (err) {
                console.error(err)
            }
        }
        loadLesson()
    }, [])

    return (
        <>
            <h1 className="text-center text-danger">Danh muc bai hoc cua khoa hoc</h1>
            <Row>
                {lesson.map(c => <EcourseCard obj={c} type='lesson' />)}
            </Row>
        </>
    )
}