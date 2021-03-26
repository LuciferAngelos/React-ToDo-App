import React, { useState } from 'react'
import s from './AddTodo.module.css'
import PropTypes from 'prop-types'

//создаём кастомный хук
function useInputValue(defaultValue = '') {
    //начальное состояние value - пустая строка

    const [value, setValue] = useState(defaultValue);

    //для того, чтобы можно было очищать и устанавливать значение value, мы возвращаем объект с методами, через которые прокидываем сами данные, получение данных, обработку данных из инпута и очистку инпута

    return {
        bind: {
            value,
            onChange: e => setValue(e.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }

}

const AddTodo = ({ onCreate }) => {

    const inputHook = useInputValue('')

    function submitHandler(e) {
        e.preventDefault();

        if (inputHook.value().trim()) {
            onCreate(inputHook.value());
            inputHook.clear()
        }
    }

    return (
        <form className={s.form} onSubmit={submitHandler}>
            <input
                type="text"
                className={s.inputTodo}
                {...inputHook.bind}
            />
            <button type='submit' className={s.addTodoButton}>Add To Do!</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}


export default AddTodo