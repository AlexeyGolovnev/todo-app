import {
    ADD_TODO,
    CLEAR_INPUT_TODO_TEXT,
    DELETE_TODO,
    INPUT_TODO_TEXT,
    TOGGLE_CHECKBOX,
} from "./type";


const initialState = {
    todoList: [],
    text: '',
    currentId: 1,
    total: 0,
    done: 0,
    left: 0,
}

export const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case INPUT_TODO_TEXT: {
            return {
                ...state,
                text: action.payload,
            }
        }
        case ADD_TODO: {
            if (state.text !== '') {
                const newTodo = {
                    id: state.currentId,
                    text: state.text,
                    checked: false,
                }
                return {
                    ...state,
                    todoList: [...state.todoList, newTodo],
                    currentId: state.currentId + 1,
                    total: state.total + 1,
                    left: state.left + 1,
                }
            }
            return state;
        }
        case CLEAR_INPUT_TODO_TEXT: {
            return {
                ...state,
                text: '',
            }
        }
        case TOGGLE_CHECKBOX: {
            let newDoneTodo, newLeftTodo;

            return {
                ...state,
                todoList: state.todoList.map(todo => {
                    if (todo.id === action.payload) {
                        if (todo.checked) {
                            newDoneTodo = state.done - 1;
                            newLeftTodo = state.left + 1;
                        } else {
                            newDoneTodo = state.done + 1;
                            newLeftTodo = state.left - 1;
                        }
                        return {
                            ...todo,
                            checked: !todo.checked,
                        }
                    }
                    return todo;
                }),
                done: newDoneTodo,
                left: newLeftTodo,

            }
        }
        case DELETE_TODO: {
            return {
                ...state,
                todoList: state.todoList.filter(todo => {
                    if (todo.id !== action.payload) return todo
                }),
                total: state.total - 1,
                left: state.total - state.done,
                done: state.done - 1,
            }
        }
        default:
            return state;
    }

}