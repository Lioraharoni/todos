import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { updateUserBalance } from "../store/actions/user.actions.js"
import { saveTodo } from "../store/actions/todo.actions.js"

const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouterDOM

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])


    function loadTodo() {
        todoService.get(params.todoId)
            .then(data => {
                setTodoToEdit(data)
                // prevIsDoneRef.current = data.isDone
                console.log("loadTodo prevIsDone=", data.isDone);
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        // console.log("handleChange prevIsDone=", prevIsDoneRef);
        
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        console.log(field, value);
        
        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit)
            .then(savedTodo => {
                navigate('/todo')
                showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('err:', err)
            })

    }

    const { txt, importance, isDone, color } = todoToEdit

    return (
        <section className="todo-edit">
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} checked={isDone} type="checkbox" name="isDone" id="isDone" />

                <label for="color">Select todo's color:</label>
                <input onChange={handleChange} type="color" id="color" name="color" value={color}/>
                <button>Save</button>
            </form>
        </section>
    )
}