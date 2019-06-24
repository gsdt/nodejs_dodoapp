import React, { Component } from 'react'
import {Form, Col, Row, Button, Container  } from 'react-bootstrap'

export default class TodoInput extends Component {
    state = {
        input: ''
    }

    handleOnChanged = (e)=> {
        this.setState({[e.target.name]: e.target.value})
    }

    handleOnSubmit = (e) => {
        console.log("TodoInput: ", e);
        e.preventDefault();
        this.props.onSubmit(this.state.input);
        this.setState({input: ''})
    }

    handleOnKeydown = (e) => {
        if(e.key === "Enter") {
            this.handleOnSubmit(e);
        }
    }

    render() {
        return (
            <Form as={Container}>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Control type="text" name="input" value={this.state.input}
                        onChange={this.handleOnChanged}
                        onKeyDown={this.handleOnKeydown}
                        placeholder="Type new task here..." />
                    </Col>
                    <Col xs={2}>
                        <Button size="sm" type="submit" onClick={this.handleOnSubmit} block>Add task</Button>
                    </Col>
                </Form.Group>
            </Form>
        )
    }
}
