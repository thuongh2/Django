import { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Apis, { endpoint } from '../configs/Apis'

export default function Header() {

    const [categories, setCategories] = useState([])
    const [q, setQ] = useState("")
    const history = useHistory()

    useEffect(() => {
        const loadCategories = async () => {
            let res = await Apis.get(endpoint['categories'])
            setCategories(res.data)
        }

        loadCategories()
    }, []) //depenetcy componentDidMount chi goi 1 lan khi component load 

    const search =(event)=>{
        event.preventDefault()
        history.push(`/?q=${q}`)
    }


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">EcourseApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        {categories.map(c => {
                            let path = `/?category_id=${c.id}`
                            return <Link key={c.id} className="nav-link" to={path} >{c.name}</Link>
                        })}
                    </Nav>
                    <Form className="d-flex" onSubmit={search}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={q}
                            onChange = {(event)=> setQ(event.target.value)}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}