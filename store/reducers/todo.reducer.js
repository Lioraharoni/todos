import { todoService } from "../../services/todo.service.js"

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO='UPDATE_TODO'

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'


const initialState = {
    todos: [],
    totalTodosCount: 0,
    doneTodosCount: 0,
    isLoading: false,
    filterBy: todoService.getDefaultFilter()
}

export function todoReducer(state = initialState, cmd={}){
    let newDoneTodosCount
    switch(cmd.type){
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos,
                totalTodosCount: cmd.totalTodosCount,
                doneTodosCount: cmd.doneTodosCount
            }

        case REMOVE_TODO:
            
            
            let todoToRemove = state.todos.find(todo => todo._id === cmd.todoId)
            newDoneTodosCount = todoToRemove.isDone ? state.doneTodosCount - 1 : state.doneTodosCount
            console.log("REMOVE_TODO todos=", state.todos, "totalTodosCount=", state.totalTodosCount, "doneTodosCount=", state.doneTodosCount, "todoToRemove=",todoToRemove, "newDoneTodosCount=",newDoneTodosCount);
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId),
                totalTodosCount: state.totalTodosCount - 1,
                doneTodosCount: newDoneTodosCount
            }

        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, cmd.todo]
            }

        case UPDATE_TODO:
            console.log("UPDATE_TODO todos=", state.todos, cmd, state);
            let prevIsDone = state.todos.find(todo => todo._id === cmd.todo._id).isDone
            newDoneTodosCount = state.doneTodosCount
            console.log("UPDATE_TODO prevIsDone=", prevIsDone);

            if(prevIsDone && !cmd.todo.isDone)
            {
                newDoneTodosCount--
            }
            else if(!prevIsDone && cmd.todo.isDone)
            {
                newDoneTodosCount++
            }
            
            console.log("UPDATE_TODO newDoneTodosCount=", newDoneTodosCount);
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo),
                doneTodosCount: newDoneTodosCount
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: cmd.filterBy
            }

        default:
            return state
    }
}