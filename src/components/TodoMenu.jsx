import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default class TodoMenu extends Component {
    state = {
        tasks: [
        ]
    }

    handleOnStateChanged = (id) => {
        const client = this.props.client;
        const task = this.state.tasks.find(todo => todo.id === id);
        client.request(`
          mutation {
            update(id: ${id}, done: ${!task.done}) {
                id
                content
                done
            }
          }`
        )
            .then(result => {
                this.setState({
                    tasks: this.state.tasks.map(todo => {
                        if (todo.id === id) {
                            todo.done = !todo.done;
                        }
                        return todo;
                    })
                })
            })
            .catch(error => {
                toast.error(error.message);
            });;
    }

    handleOnRemove = (id) => {
        const client = this.props.client;
        client.request(`
          mutation {
            delete(id: ${id}) {
              id
            }
          }`
        )
            .then(result => {
                this.setState({
                    tasks: this.state.tasks.filter(todo => todo.id !== result.delete.id)
                })
            })
            .catch(error => {
                toast.error(error.message);
            });;

    }

    handleOnSubmit = (input) => {
        const client = this.props.client;
        client.request(`
          mutation {
            create(content: "${input}") {
              id
              content
              done
            }
          }`
        )
        .then(result => {
            const newTask = {
                id: result.create.id,
                content: result.create.content,
                done: result.create.done
            }
            this.setState({
                tasks: [...this.state.tasks, newTask]
            })
        })
        .catch(error => {
            toast.error(error.message);
        });;

    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        console.log("App did update");
    }

    fetchData() {
        const client = this.props.client;
        client.request(`
          {
            tasks {
              id
              content
              done
            }
          }`
        )
            .then(result => {
                // console.log(result);
                this.setState({
                    tasks: result.tasks
                })
            })
            .catch(error => {
                toast.error(error.message);
            });
    }
    render() {
        return (
            <div>
                <TodoInput onSubmit={this.handleOnSubmit}/>
                <TodoList todos={this.state.tasks} 
                    onRemove={this.handleOnRemove}
                    onStateChanged={this.handleOnStateChanged}/>
            </div>
        )
    }
}
