import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

class ToDo extends Component {
    state = { tasks: [{ id: 1, desc: "fixed task" }], input: "" };

    componentDidMount() {
        const lsTasks = localStorage.getItem("tasks");

        if (lsTasks) {
            this.setState({ tasks: JSON.parse(lsTasks) });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tasks !== this.state.tasks) {
            localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
        }
    }

    handleClick = () => {
        const newTask = { id: uuidv4(), desc: this.state.input };
        this.setState({ tasks: [...this.state.tasks, newTask] });
        this.setState({ input: "" });
    };

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    };

    handleEnter = (e) => {
        if (e.key === "Enter") {
            const newTask = { id: uuidv4(), desc: this.state.input };
            this.setState({ tasks: [...this.state.tasks, newTask] });
            this.setState({ input: "" });
        }
    };

    handleDelete = (id) => {
        const filtredTasks = this.state.tasks.filter((task) => task.id !== id);
        this.setState({ tasks: filtredTasks });
    };

    handleReset = () => {
        localStorage.removeItem("tasks");
    };

    render() {
        return (
            <>
                <h1>ToDo List</h1>
                <input
                    placeholder="type new task"
                    value={this.state.input}
                    onChange={this.handleChange}
                    onKeyDown={this.handleEnter}
                />
                <p>Tasks: ({this.state.tasks.length})</p>
                <ol>
                    {this.state.tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                {task.desc}
                                <button
                                    onClick={() => {
                                        this.handleDelete(task.id);
                                    }}
                                >
                                    X
                                </button>
                            </li>
                        );
                    })}
                </ol>
                <button onClick={this.handleClick}>Add ToDo task</button>
                <button onClick={this.handleReset}>Reset LS</button>
            </>
        );
    }
}

export default ToDo;
