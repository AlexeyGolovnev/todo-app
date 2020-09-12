import React from 'react';
import {Button} from 'react-bootstrap';
import './App.scss';
import TodoItem from "./components/TodoItem/TodoItem";
import {addTodo, clearInputTodoText, inputTodoText} from "./redux/action";
import {connect} from "react-redux";

function App(props) {

    let todos = props.todoList.map(todo => {
            if (todo.checked) {
                return (
                    <TodoItem
                        cbChecked={{textDecoration: 'line-through'}}
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        checked={todo.checked}
                        action={props.toggleCheckBox}
                    />
                )
            } else {
                return (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        checked={todo.checked}
                        action={props.toggleCheckBox}
                    />
                )
            }
        }
    )
    const addTodo = () => {
        props.addTodo(props.text);
        props.clearInputTodoText();
    }
    return (
        <div className='app-wrapper'>
            <span className='logo'>TODO APP</span>
            <header className='header'>
                <div className='input-container'>
                    <input
                        type='text'
                        onChange={(e) => {
                            props.inputTodoText(e.target.value)
                        }}
                        value={props.text}
                        placeholder='Enter Todo'
                    />
                    <Button
                        className='addBtn'
                        variant='success'
                        size="sm"
                        onClick={addTodo}
                        title='Add Todo'
                    >
                        +
                    </Button>
                </div>
                <div className='todo-info'>
                    <span className='todo-info__total'>Total: {props.totalTodo}</span>
                    <span className='todo-info__done'>Done: {props.doneTodo}</span>
                    <span className='todo-info__left'>Left: {props.leftTodo}</span>
                </div>
            </header>

            <div className="todo-container">
                {todos}
            </div>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        text: state.text,
        todoList: state.todoList,
        currentId: state.currentId,
        totalTodo: state.total,
        doneTodo: state.done,
        leftTodo: state.left,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        inputTodoText: (text) => dispatch(inputTodoText(text)),
        addTodo: (todo) => dispatch(addTodo(todo)),
        clearInputTodoText: () => dispatch(clearInputTodoText()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
