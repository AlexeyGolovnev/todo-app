import React, {useState} from 'react';
import './TodoItem.scss';
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {
    deleteTodo,
    toggleCheckBox,
} from "../../redux/action";
import {useSpring, animated} from 'react-spring'

function TodoItem(props) {

    const dispatch = useDispatch();

    const [isClickedToDeleteBtn, setIsClickedToDeleteBtn] = useState(false)
    const [countChkBoxClick, setCountChkBoxClick] = useState(0);

    const animatedSettings = useSpring({
        immediate: ((!isClickedToDeleteBtn && props.isDone) || countChkBoxClick !== 0),
        reset: true,
        reverse: isClickedToDeleteBtn,
        from: {
            opacity: 0,
            transform: 'translateX(-500px)',
        },
        to: {
            opacity: 1,
            transform: 'translateX(0px)',
        },
        config: {
            duration: 500
        }
    })

    const removeTodo = () => {
        setIsClickedToDeleteBtn(!isClickedToDeleteBtn);
        setTimeout(() => {
            dispatch(deleteTodo(props.id));
        }, 250);
    }
    const clickToCheckBox = () => {
        props.todo.isDone
            ? setCountChkBoxClick(1)
            : setCountChkBoxClick(0);
        dispatch(toggleCheckBox(props.id));
    }
    return (
        <animated.div
            style={animatedSettings}
            className='todo-item'>
            <input
                type='checkbox'
                className='todo-item__checkbox'
                checked={props.isDone}
                onChange={clickToCheckBox}
            />
            <animated.span
                className={props.isDone ? 'todo-item__text todo-item__done' : 'todo-item__text'}
            >
                {props.text}
            </animated.span>
            <Button
                className='todo-item__dltBtn'
                variant='danger'
                hidden={!props.isDone}
                onClick={removeTodo}
                title='Delete Todo'
            >
                &times;
            </Button>
        </animated.div>
    );
}


export default TodoItem;