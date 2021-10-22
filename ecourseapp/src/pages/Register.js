import { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'


export default function Register() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email, setEmail] = useState()
    const avata = useRef()

    const register =(event) =>{
        event.preventDefault()
        
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
                <ItemForm name='Confirm Password' type="text" value={confirmPassword} change={(event) => { setConfirmPassword(event.target.value) }} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
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