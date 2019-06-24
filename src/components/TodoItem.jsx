import React, { Component } from 'react'
import {Button, Row, Col} from 'react-bootstrap'
export default class TodoItem extends Component {
    getStyle() {
        const done = this.props.todo.done;
        return {
            textDecoration: done && 'line-through'
        }
    }

    render() {
        const {id, content, done} = this.props.todo
        return (
            <Row style={
                {
                    background: "#f4f4f4",
                    padding: "5px",
                    borderBottom: "1px #ccc dotted",
                }
                }>
                <Col xs={1}>
                <input type="checkbox" id={id} onChange={this.props.onStateChanged.bind(this, id)} checked={done}/>
                </Col>
                <Col>
                <p style={this.getStyle()}>{content}</p>
                </Col>
                <Col xs={2} className="justify-content-center">
                    <Button variant="danger" size="sm" onClick={this.props.onRemove.bind(this, id)} block>Remove</Button>
                </Col>
            </Row>
        )
    }
}
