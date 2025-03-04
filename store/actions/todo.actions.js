import { todoService } from "../../services/todo.service.js";
import { ADD_TODO, REMOVE_TODO, SET_IS_LOADING, SET_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js";
import { store } from "../store.js";
import { addUserActivity, updateUserBalance } from "./user.actions.js";


export const ACTIVITY_UPDATE_TODO='Updated the todo'
export const ACTIVITY_REMOVE_TODO='Removed the todo'
export const ACTIVITY_ADD_TODO='Added a todo'

export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    store.dispatch({type: SET_IS_LOADING, isLoading: true})
    return todoService.query(filterBy)
        .then(todosObject => store.dispatch({type: SET_TODOS, todos: todosObject.todos, 
            totalTodosCount: todosObject.totalTodosCount, doneTodosCount: todosObject.doneTodosCount}))
        .catch(err => {
            console.error('todo action -> Cannot load todos', err)
            throw err
       })
       .finally(store.dispatch({type: SET_IS_LOADING, isLoading:false}))
}


export function removeTodo(todoId)
{
    const todoToRemove = store.getState().todoModule.todos.find(todo => todo._id === todoId)
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({type: REMOVE_TODO, todoId})
            console.log('todo action -> todo removed')
            addUserActivity({at: new Date(), txt: ACTIVITY_REMOVE_TODO, name: todoToRemove.txt})
        })
        .catch(err => {
            console.error('todo action -> Cannot remove todo:', err)
            throw err
        })
}

export function updateTodo(todoToUpdate)
{
    const todoBeforeUpdate = store.getState().todoModule.todos.find(todo => todo._id === todoToUpdate._id) 
    const prevIsDone = todoBeforeUpdate ? todoBeforeUpdate.isDone : true

    return todoService.save(todoToUpdate)
    .then((savedTodo) => {
        store.dispatch({type: UPDATE_TODO, todo: savedTodo})
        console.log('todo action -> todo updated')
        addUserActivity({at: new Date(), txt: ACTIVITY_UPDATE_TODO, name: savedTodo.txt})
        
        if(!prevIsDone && savedTodo.isDone)
        {
            updateUserBalance(10)
        }
        return savedTodo
    })
    .catch(err => {
        console.error('todo action -> Cannot update todo:', err)
        throw err
    })
}

export function addTodo(todo)
{
    return todoService.save(todo)
    .then((savedTodo) => {
        
        store.dispatch({type: ADD_TODO, todo: savedTodo})
        console.log('todo action -> todo added')
        addUserActivity({at: new Date(), txt: ACTIVITY_ADD_TODO, name: savedTodo.txt})
        if(savedTodo.isDone)
        {
            updateUserBalance(10)
        }
        return savedTodo
    })
    .catch(err => {
        console.error('todo action -> Cannot update todo:', err)
        throw err
    })
}

export function saveTodo(todo)
{
    if(todo._id)
    {
        return updateTodo(todo)
    }
    else
    {
        return addTodo(todo)
    }
}