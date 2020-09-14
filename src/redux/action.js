export const updateTodoText = (text) => {
    return {
        type: 'UPDATE_TODO_TEXT',
        inputText: text,
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
        todoId: todoId,
    }
}

export const deleteTodo = (todoId) => {
    return {
        type: 'DELETE_TODO',
        todoId: todoId,
    }
}

