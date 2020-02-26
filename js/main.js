'use strict'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            taskName: props.taskName,
            isDone: false
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
                    onClick: () => this.setState({isDone: !this.state.isDone})
                },
                this.state.taskName
            ),
            React.createElement(
                'button',
                {
                    onClick: () => {
                        console.log('Item (' + this.state.id + ') should be deleted.')
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
            tasks: []//[1, 2, 3, 4, 5]
        }
    }

    addItem = newItem => {
        if (newItem !== '') {
            newItem = {
                id: Date.now(),
                text: newItem
            }
            const items = [...this.state.tasks, newItem]
            this.setState({
                tasks: items
            })
        }
    }


    deleteItem = key => {
        let filteredItems = this.state.tasks.filter(item => item.id !== key)
        // filteredItems[key] = 'removed'

        console.log('')
        console.log(key)
        console.log(filteredItems)
        console.log('----')

        this.setState({
            tasks: filteredItems
        })
    }

    render() {
        const tasksList = this.state.tasks.map((item) => React.createElement(TodoItem, { id: item.id, key: item.id, taskName: item.text, deleteItem: this.deleteItem }))

        console.log('--+--')
        console.log(this.state.tasks)
        console.log(tasksList)
        console.log('--+--')

        return React.createElement("div", { className: 'react-app' }, React.createElement(InputField, {addItem: this.addItem}), tasksList);

    }
}


ReactDOM.render(
    React.createElement(TodoForm),
    document.getElementById('react-app')
);



















