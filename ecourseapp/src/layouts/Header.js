import { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Apis, { endpoint } from '../configs/Apis'
import cookies from 'react-cookies'
import { logoutUser } from '../ActionCreators/UserCreators.js';
import {useLocation} from 'react-router'

export default function Header() {

    const [categories, setCategories] = useState([])
    const [q, setQ] = useState("")
    const history = useHistory()
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const [change , setChange] = useState(0)


    useEffect(() => {
        const loadCategories = async () => {
            let res = await Apis.get(endpoint['categories'])
            setCategories(res.data)
        }

        loadCategories()
    }, []) //depenetcy componentDidMount chi goi 1 lan khi component load 

    const search = (event) => {
        event.preventDefault()
        history.push(`/?q=${q}`)
    }

    const logout = (event) => {
        event.preventDefault()
        cookies.remove("access_token")
        cookies.remove("user")
        dispatch(logoutUser())
        window.localStorage.clear()
        window.location.reload(false);
    }

    let path = <>
        <Link className="nav-link" to="/login" >Login</Link>
        <Link className="nav-link" to="/register" >Register</Link>

    </>

    if (user !== null && user !== undefined) {
        path =
            <>
                <Link className="nav-link" to="/" >{user.username}</Link>
                <Link className="nav-link" onClick={logout} >Log out</Link>
            </>
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">EcourseApp</Navbar.Brand>
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
                            onChange={(event) => setQ(event.target.value)}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    {path}
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}