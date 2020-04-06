import * as React from "react";
import './TodoList.css';
import {TodoItemProps, TodoItem} from "./TodoItem";
import {ChangeEvent} from "react";


// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
interface TodoListState {
    TodoList: TodoItemProps[],
    value: string
}
export class TodoList extends React.Component<{}, TodoListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            TodoList: [],
            value: ""
        }
    }
    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value});
    }

    itemCheck = (id: number) => {
        let index = this.state.TodoList.findIndex(i => i.id == id);

        if(index !== undefined){
            this.state.TodoList[index].isDone = !this.state.TodoList[index].isDone
            this.setState({TodoList: [...this.state.TodoList]});
            this.storeTodoList();
        }
    }

    addItem = (value: string) => {
        if(value !== "")
        {
            let newItem: TodoItemProps = {id: this.state.TodoList.length == 0 ? 1 : Math.max(...this.state.TodoList.map(i => i.id)) + 1, value: value, isDone: false}
            this.setState({TodoList: [...this.state.TodoList, newItem], value: ""});
        }
    }

    storeTodoList = () => {
        localStorage.setItem("todoList", JSON.stringify(this.state.TodoList));
    }

    getTodoList = () => {
        let todoListString:string|null = localStorage.getItem("todoList");
        if(todoListString !== null){
            this.setState({TodoList: JSON.parse(todoListString)});
        }
    }
    componentWillMount(): void {
        this.getTodoList();
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<TodoListState>, snapshot?: any): void {
        this.storeTodoList();
    }

    render() {
        return (
            <React.Fragment>
                <div className="header">
                    <h2>To-Do List</h2>
                    <input value={this.state.value} onChange={this.handleChange} type="text" placeholder="Title..."/>
                    <span onClick={() => this.addItem(this.state.value)} className="addBtn">Add</span>
                </div>
                <ul>
                    {this.state.TodoList.map(i => <TodoItem key={i.id} clickHandle={this.itemCheck} {...i} />)}
                </ul>
            </React.Fragment>
        );
    }
}
