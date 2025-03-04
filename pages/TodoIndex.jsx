import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { store } from "../store/store.js"
import { loadTodos, removeTodo, updateTodo } from "../store/actions/todo.actions.js"

import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js"
import { updateUser, updateUserBalance } from "../store/actions/user.actions.js"
const { useSelector, useDispatch } = ReactRedux

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {

    // const [todos, setTodos] = useState(null)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const todos = useSelector(storeState => storeState.todoModule.todos)

    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    // const [filterBy, setFilterBy] = useState(defaultFilter)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos()
            .catch(showErrorMsg('Cannot load todos'))
    }, [filterBy])

    function onRemoveTodo(todoId) {
        var isSure = confirm("Are you sure want to delete?");
        if(isSure)
        {
            removeTodo(todoId)
                .then(() => showSuccessMsg(`Todo removed`))
                .catch(err => showErrorMsg('Cannot remove todo'))
        }
    }

    function onToggleTodo(todo) {
        debugger
        console.log("onToggleTodo todo", todo);
        const todoToSave = { ...todo, isDone: !todo.isDone }

        updateTodo(todoToSave)
            .then(savedTodo => 
                {
                    console.log("onToggleTodo savedTodo", savedTodo);
                    
                    if(savedTodo.isDone)
                    {
                        updateUserBalance(10)
                    }
                    showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
                })
            .catch(err => showErrorMsg('Cannot toggle todo ' + todo.id))
    }

    function setFilterBy(newFilterBy){
        store.dispatch({type: SET_FILTER_BY, filterBy : newFilterBy})
        
    }



    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>

            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}