'use strict'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            taskName: props.taskName,
            isDone: props.isDone
        }
    }

    render() {
        return React.createElement(
            'div',
            {
                className: 'task-item ' + this.state.id
            },
            React.createElement(
                'span',
                {
                    className: this.state.isDone ? 'done' : '',
                    onClick: () => this.props.toggleDone(this.state.id)
                },
                this.state.taskName
            ),
            React.createElement(
                'button',
                {
                    onClick: () => {
                        this.props.deleteItem(this.state.id)
                    }
                },
                'x'
            )
        )
    }
}

class InputField extends React.Component {
    render() {
        return React.createElement(
            'input',
            {
                type: 'text',
                className: 'input-field',
                placeholder: 'Type something and press enter',
                onKeyDown: e => {
                    if (e.which == 13) {
                        this.props.addItem(e.target.value)
                        e.target.value = ''
                    }
                }
            }
            )
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
    }

    addItem = newItem => {
        if (newItem !== '') {
            newItem = {
                id: Date.now(),
                text: newItem,
                isDone: false
            }
            const items = [...this.state.tasks, newItem]
            this.setState({
                tasks: items
            })
        }
    }

    toggleDone = key => {
        const newTasks = this.state.tasks.map(item => {
            if (item.id === key) item.isDone = !item.isDone
            return item
        })

        this.setState({
            tasks: newTasks
        })
    }

    deleteItem = key => {
        let filteredItems = this.state.tasks.filter(item => item.id !== key)

        this.setState({
            tasks: filteredItems
        })
    }

    render() {
        const undoneTasks = this.state.tasks.map((item) => {
            if (!item.isDone)
                return React.createElement(
                    TodoItem,
                    {
                        id: item.id,
                        key: item.id,
                        taskName: item.text,
                        isDone: item.isDone,
                        deleteItem: this.deleteItem,
                        toggleDone: this.toggleDone
                    })
        })
        const doneTasks = this.state.tasks.map((item) => {
            if (item.isDone)
                return React.createElement(
                    TodoItem,
                    {
                        id: item.id,
                        key: item.id,
                        taskName: item.text,
                        isDone: item.isDone,
                        deleteItem: this.deleteItem,
                        toggleDone: this.toggleDone
                    })
        })

        return React.createElement(
            "div",
            { className: 'react-app' },
            React.createElement(InputField, {addItem: this.addItem}),
            undoneTasks,
            doneTasks);

    }
}


ReactDOM.render(
    React.createElement(TodoForm),
    document.getElementById('react-app')
);



















