import { useEffect, useState } from 'react'
import Apis, { endpoint } from '../configs/Apis'
import { Row, Button, ButtonGroup } from 'react-bootstrap'
import EcourseCard from '../layouts/EcourseCard'
import { useLocation } from 'react-router'

export default function Home() {

    const [courses, setCourses] = useState([])
    const [previous, setPrevious] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)

    const location = useLocation()

    useEffect(() => {
        let loadCourses = async () => {
            let query = location.search
            if (query === '')
                query = `?page=${page}`
            else
                query += `&page=${page}`

            try {
                let res = await Apis.get(`${endpoint['courses']}${query}`)
                setCourses(res.data.results)

                setNext(res.data.next !== null)
                setPrevious(res.data.previous !== null)
            }
            catch (err) {
                console.error(err)
            }
        }
        loadCourses()
    }, [location.search, page])

    const paging = (inc) => {
        setPage(page + inc)
    }

    return (
        <>
            <h1 className="text-center text-danger">DANH MUC KHOA HOC</h1>
            <Row>
                {courses.map(c => <EcourseCard obj={c} />)}
            </Row>
            <div style={{'textAlign': 'center'}}>
                <ButtonGroup className="me-2 " aria-label="First group">
                    <Button disabled={!previous} onClick={() => paging(-1)} >1</Button>
                    <Button disabled={!next} onClick={() => paging(1)}>2</Button>
                </ButtonGroup>
            </div>
        </>
    )
}