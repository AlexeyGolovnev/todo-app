import React, {useState} from 'react';
import './TodoItem.scss';
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {
    deleteTodo,
    toggleCheckBox,
} from "../../redux/action";
import {useSpring, animated} from 'react-spring'


function TodoItem(props) {

    const [isClickedToDeleteBtn, setIsClickedToDeleteBtn] = useState(false)
    const [countChkBoxClick, setCountChkBoxClick] = useState(1);

    const animatedSetting = useSpring({
        immediate:((!isClickedToDeleteBtn && props.checked) || countChkBoxClick !== 1),
        reset:true,
        reverse:isClickedToDeleteBtn,
        from: {
            opacity:0,
            transform:'translateX(-500px)',
        },
        to: {
            opacity:1,
            transform:'translateX(0px)',
        },
        config: {
            duration: 500
        }
    })

    const deleteTodo = () => {
        setIsClickedToDeleteBtn(!isClickedToDeleteBtn);
        setTimeout(() => {
            props.deleteTodo(props.id)
        },250);
    }
    const toogleCheckBox = () => {
        props.todo.checked
            ? setCountChkBoxClick(2)
            : setCountChkBoxClick(1);
        props.toggleCheckBox(props.id)
    }
    return (
        <animated.div
            style = {animatedSetting}
            className='todo-item'>
            <input
                type='checkbox'
                className='todo-item__checkbox'
                checked={props.checked}
                onChange={toogleCheckBox}
            />
            <span className='todo-item__text' style={props.cbChecked}>{props.text} </span>
            <Button
                className='todo-item__dltBtn'
                variant='danger'
                hidden={!props.checked}
                onClick={deleteTodo}
                title='Delete Todo'
            >
                &times;
            </Button>
        </animated.div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        toggleCheckBox: (todoId) => dispatch(toggleCheckBox(todoId)),
        deleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
    }
}
export default connect(null, mapDispatchToProps)(TodoItem);