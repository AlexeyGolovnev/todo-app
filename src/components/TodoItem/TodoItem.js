import React from 'react';
import './TodoItem.scss';
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {
    deleteTodo,
    toggleCheckBox,
} from "../../redux/action";


function TodoItem(props) {


    return (
        <div className='todo-item'>
            <input
                type='checkbox'
                className='todo-item__checkbox'
                checked={props.checked}
                onChange={() => {
                    props.toggleCheckBox(props.id)
                }}
            />
            <span className='todo-item__text' style={props.cbChecked}>{props.text} </span>
            <Button
                className='todo-item__dltBtn'
                variant='danger'
                hidden={!props.checked}
                onClick={() => props.deleteTodo(props.id)}
                title='Delete Todo'
            >
                &times;
            </Button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCheckBox: (todoId) => dispatch(toggleCheckBox(todoId)),
        deleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
    }
}
export default connect(null, mapDispatchToProps)(TodoItem);