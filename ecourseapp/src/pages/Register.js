import { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Apis, { endpoint } from '../configs/Apis'
import { useHistory } from 'react-router-dom'

export default function Register() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email, setEmail] = useState()
    const avata = useRef()
    const history = useHistory()

    function register(event) {
        event.preventDefault()
        console.log(1)
        let registerUser = async () => {
            const formData = new FormData()
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("username", username)
            formData.append("firstName", firstName)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("avatar", avata.current.files[0])

            try {
                let res=await Apis.post(endpoint['register-user'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                console.log(res.data)
                history.push('/login')
            } catch (err) {
                console.error(err)
            }
        }
        if (password !== null && password === confirmPassword)
            registerUser()
    }


    return (
        <>
            <h1 className="text-center text-danger">Dang ki nguoi dung</h1>
            <Form onSubmit={register}>
                <ItemForm name='First Name' type="text" value={firstName} change={(event) => { setFirstName(event.target.value) }} />
                <ItemForm name='Last Name' type="text" value={lastName} change={(event) => { setLastName(event.target.value) }} />
                <ItemForm name='User Name' type="text" value={username} change={(event) => { setUsername(event.target.value) }} />
                <ItemForm name='Email' type="email" value={email} change={(event) => { setEmail(event.target.value) }} />
                <ItemForm name='Password' type="password" value={password} change={(event) => { setPassword(event.target.value) }} />
                <ItemForm name='Confirm Password' type="password" value={confirmPassword} change={(event) => { setConfirmPassword(event.target.value) }} />
                <Form.Group className="mb-3" >
                    <Form.Label>Avata</Form.Label>
                    <Form.Control type='file'
                        ref={avata}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export function ItemForm(props) {
    return (
        <>
            <Form.Group className="mb-3" controlId={`formBasic${props.name}`} >
                <Form.Label>{props.name}</Form.Label>
                <Form.Control type={props.type}
                    placeholder={props.name}
                    value={props.value}
                    onChange={props.change}
                />
            </Form.Group>
        </>
    )
}