import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
toast.configure();

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleOnTextChanged = (e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit = (e)=> {
        e.preventDefault();
        const client = this.props.client;
        client.request(`
        mutation {
            login(username: "${this.state.username}", password: "${this.state.password}") {
                token
            }
        }
        `).then(result => {
            console.log(result);
            const cookies = new Cookies();
            cookies.set('token', result.login.token, { path: '/' });
            window.location.href = "/";
        }).catch(error => {
            toast.error(error.message);
        })

    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleOnTextChanged}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleOnTextChanged}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleOnSubmit}>
                    Login
                </Button>
            </Form>
        )
    }
}
