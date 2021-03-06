class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            todos: []
        }

    }
    deleteToDo = (id, index) => {
        fetch('todos/' + id,
            {
                method: 'DELETE'
            })
            .then(data => {
                this.setState({
                    todos: [
                        ...this.state.todos.slice(0, index),
                        ...this.state.todos.slice(index + 1)
                    ]
                })
            })
    }
    updateToDo = (todo, index) => {
        todo.complete = !todo.complete
        fetch('todos/' + todo._id, {
            body: JSON.stringify(todo),
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(updatedToDo => updatedToDo.json())
            .then(jsonedToDo => {
                fetch('/todos')
                    .then(response => response.json())
                    .then(todos => {
                        this.setState({ todos: todos })
                    })
            })
    }
    componentDidMount() {
        fetch('/todos')
            .then(response => response.json())
            .then(todos => {
                this.setState({
                    todos: todos
                })
            })
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch('/todos', {
            body: JSON.stringify({ description: this.state.description }),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(createdToDo => {
                return createdToDo.json()
            })
            .then(jsonedToDo => {
                // reset the form
                // add person to list
                this.setState({
                    description: '',
                    todos: [jsonedToDo, ...this.state.todos]
                })
                console.log(jsonedToDo)
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <h1> To Dos </h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='description'>Description</label>
                    <input type='text' value={this.state.description} onChange={this.handleChange} id='description' />
                    <input type='submit' />
                </form>
                <h2>{this.state.description}</h2>
                <table>
                    <tbody>
                        {this.state.todos.map((todo, index) => {
                            return (
                                <tr >
                                    <td className={todo.complete ? 'complete' : ''}> {todo.description} </td>
                                    <td onClick={() => this.deleteToDo(todo._id, index)}> X </td>
                                    <td onClick={() => this.updateToDo(todo, index)} > complete </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('.container')
)