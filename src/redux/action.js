export const inputTodoText = (text) => {
    return {
        type: 'INPUT_TODO_TEXT',
        payload: text,
    }
}

export const addTodo = () => {
    return {type: 'ADD_TODO'}

}
export const clearInputTodoText = () => {
    return {type: 'CLEAR_INPUT_TODO_TEXT'}
}

export const toggleCheckBox = (todoId) => {
    return {
        type: 'TOGGLE_CHECKBOX',
        payload: todoId,
    }
}

export const deleteTodo = (todoId) => {
    return {
        type: 'DELETE_TODO',
        payload: todoId,
    }
}

