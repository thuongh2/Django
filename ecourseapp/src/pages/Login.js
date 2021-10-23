import { useState } from 'react'
import {Container,  Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { loginUser } from '../ActionCreators/UserCreators'
import Apis, { endpoint } from '../configs/Apis'
import cookies from 'react-cookies'

export default function Login() {

    const [username, setUsername]= useState()
    const [password, setPassword]= useState()
    const dispatch = useDispatch()
    const history = useHistory()

    const login = async (event) => {
        event.preventDefault()
        try{
            let info = await Apis.get(endpoint['oauth2-info'])
            console.log(info)
            let res = await Apis.post(endpoint['login'], {
                "client_id": info.data.client_id,
                "client_secret": info.data.client_secret,
                "username": username,
                "password": password,
                "grant_type": "password",
            })

            
            cookies.save('access_token', res.data.access_token)

            let user = await Apis.get(endpoint['current-user'], { 
                headers:{
                    'Authorization': `Bearer ${cookies.load('access_token')}`
                }
            })
            console.info(user.data)
            cookies.save('user', user.data)

            dispatch(
                loginUser(user.data)
            )
            history.push('/')

        }catch(err){
            console.error(err)
        }

    }

    return (
        <>
            <Container>
               
                <Form onSubmit={login} className="mt-5" style={{'width':'50%', 'margin': 'auto'}}>
                <h1>Đăng nhập</h1>
                    <Form.Group className="mb-3"  controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text"
                                    placeholder="Enter email" 
                                    value={username}
                                    onChange = {(event)=>setUsername(event.target.value)}
                                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                     placeholder="Password" 
                                     value ={password}
                                     onChange = {(event)=>setPassword(event.target.value)}
                                     />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}