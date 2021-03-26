import React from 'react'
import ToDoItem from './ToDo Item/ToDoItem'
import PropTypes from 'prop-types'
import s from './ToDoList.module.css'




//так можно тоже описать стили в реакте         <ul style={styles.ul}>

// const styles = {
//     ul: {
//         listStyle: 'none',
//         margin: 0,
//         padding: 0
//     }
// }

function ToDoList(props) {

    return (
        <ul className={s.mainList}>
            {props.todos.map((todo, index) => <ToDoItem
                key={todo.id}
                todo={todo}
                index={index}
                onToggle={props.onToggle} />)}
        </ul>
    )
}

//описываем функцию ToDoList. Типизируем

ToDoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,       //указываем, что todos - это массив, который состоит из объектов и он необходим (isRequired)
    onToggle: PropTypes.func.isRequired
}


export default ToDoList

//npm i prop-types --save-dev библиотека для типизации. Для того, чтобы типизировать входящие свойства