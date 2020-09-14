import {
    ADD_TODO,
    CLEAR_INPUT_TODO_TEXT,
    DELETE_TODO,
    UPDATE_TODO_TEXT,
    TOGGLE_CHECKBOX,
} from "./type";


const initialState = {
    todosList: [],
    text: '',
    lastId: 1,
}

export const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_TODO_TEXT: {
            return {
                ...state,
                text: action.inputText,
            }
        }
        case ADD_TODO: {
            if (state.text !== '') {
                const newTodo = {
                    id: state.lastId,
                    text: state.text,
                    isDone: false,
                }
                return {
                    ...state,
                    todosList: [...state.todosList, newTodo],
                    lastId: state.lastId + 1,
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
            return {
                ...state,
                todosList: state.todosList.map(todo => {
                    if (todo.id === action.todoId) {
                        return {
                            ...todo,
                            isDone: !todo.isDone,
                        }
                    }
                    return todo;
                })
            }
        }
        case DELETE_TODO: {
            return {
                ...state,
                todosList: state.todosList.filter(todo => {
                    if (todo.id !== action.todoId) return todo
                }),
            }
        }
        default:
            return state;
    }

}