import React, {useRef} from 'react';
import {Button} from 'react-bootstrap';
import './App.scss';
import TodoItem from "./components/TodoItem/TodoItem";
import {addTodo, clearInputTodoText, updateTodoText} from "./redux/action";
import {useDispatch, useSelector} from "react-redux";
import {useSpring, animated} from 'react-spring'

function App() {

    const dispatch = useDispatch();
    const inputText = useSelector(state => state.text);
    const todosList = useSelector(state => state.todosList);

    let todos = todosList.map(todo => {
        return (
            <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                isDone={todo.isDone}
                todo={todo}
            />
        )
    })
    const createTodo = () => {
        dispatch(addTodo(inputText));
        dispatch(clearInputTodoText());
        todoInputRef.current.focus();
    }

    const animatedSetting = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
        config: {
            duration: 1500
        }
    });

    const todoInputRef = useRef(null);

    return (
        <animated.div style={animatedSetting} className='app-wrapper'>
            <span className='logo'>TODO APP</span>
            <header className='header'>
                <div className='input-container'>
                    <input
                        ref={todoInputRef}
                        type='text'
                        onChange={(e) => {
                            dispatch(updateTodoText(e.target.value));
                        }}
                        value={inputText}
                        placeholder='Enter Todo'
                    />
                    <Button
                        className='addBtn'
                        variant='success'
                        size="sm"
                        onClick={createTodo}
                        title='Add Todo'
                    >
                        +
                    </Button>
                </div>
                <div className='todo-info'>
                    <span className='todo-info__total'>Total: {todosList.length}</span>
                    <span className='todo-info__done'>Done: {todosList.filter(todo => todo.isDone).length}
                    </span>
                    <span className='todo-info__left'>Left: {todosList.filter(todo => !todo.isDone).length}</span>
                </div>
            </header>

            <div className="todo-container">
                {todos}
            </div>

        </animated.div>
    );
}

export default App;
