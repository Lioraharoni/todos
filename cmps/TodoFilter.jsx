const { useState, useEffect } = React

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    function handleChange({ target }) {
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

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        console.log(filterByToEdit)
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                <select name="displayAll" id="displayAll" onChange={handleChange} value={filterByToEdit.displayAll}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
                </select>

                <button >Set Filter</button>
            </form>

        </section>
    )
}