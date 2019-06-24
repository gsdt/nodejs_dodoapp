import React, { Component } from 'react'
import TodoItem from './TodoItem';
import {Container} from 'react-bootstrap'

export default class TodoList extends Component {
    render() {
        const todos = this.props.todos;
        todos.sort((a, b) => {
            if(a.done > b.done) {
                return 1;
            }
            if(a.done < b.done) {
                return -1;
            }
            return a - b;
        })
        return (
            <Container>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} 
                    onStateChanged={this.props.onStateChanged}
                    onRemove={this.props.onRemove}
                    ></TodoItem>
                ))
                }
            </Container>
        )
    }
}
