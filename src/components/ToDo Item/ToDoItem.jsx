import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import s from './ToDoItem.module.css'
import Context from '../../context'


//так можно тоже описать стили в реакте

function ToDoItem({ todo, index, onToggle }) {

    //useContext - использует контекст от провайдера (от App.js)

    const { removeTodo } = useContext(Context)
    const classes = [];

    if (todo.completed) {
        classes.push('done')
    }


    //            <span className={classes.join(' ')}>
    //передаём массив в класснеймы и объединяем в строку

    //Как можно передать ИДшку, которую нужно удалить:
    //     1. < button className = { 'rm'} onClick = {() => removeTodo(todo.id)
    // }>& times;</ >
    //     т.е., делаем стрелочную функцию

    // 2. < button className = { 'rm'} onClick = { removeTodo.bind(null, todo.id) } >& times;</button >
    // т.е., биндим на null - пох на что, а вторым параметром передаём ид

    return (
        <li className={s.listItem}>
            <span className={classes.join(' ')}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    className={s.inputCheckbox}
                    onChange={() => onToggle(todo.id)}
                />
                <strong>{index + 1}. </strong>

                {todo.title}
            </span>
            <button className={'rm'} onClick={() => removeTodo(todo.id)}>&times;</button>

        </li>
    )
}


//описываем функцию ToDoItem. Типизируем
ToDoItem.propTypes = {
    todo: PropTypes.object.isRequired,       //указали, что todo - это объект и он необходим для работы
    index: PropTypes.number,
    onToggle: PropTypes.func.isRequired
}



export default ToDoItem

//npm i prop-types --save-dev библиотека для типизации. Для того, чтобы типизировать входящие свойства