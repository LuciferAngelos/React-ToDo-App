import React, { lazy, Suspense, useEffect } from 'react'
import './App.css';
import Modal from './components/Modal/Modal';
import ToDoList from './components/ToDoList'
import Preloader from './components/utils/loader';
import Context from './context'


//Искусственое торможение для эмуляции лейзи лоадинга

// const AddTodo = lazy(() => new Promise(resolve => {
//   setTimeout(() => {
//     resolve(import('./components/AddTodo/AddTodo'))
//   }, 3000)
// }))

const AddTodo = lazy(() => import('./components/AddTodo/AddTodo'))

function App() {

  //Функция useState всегда возвращает массив, состоящий из двух элементов:
  //1. само состояние
  //2. функция, позволяющая изменять состояние

  const [todos, setTodos] = React.useState([
    // { id: 1, title: 'Купить квартиру', completed: false },
    // { id: 2, title: 'Купить дачу', completed: false },
    // { id: 3, title: 'Купить хлебушек =)))', completed: false }
  ])
  const [loading, setLoading] = React.useState(true)

  //второй параметр в useEffect - пустой массив. Там передаются список зависимостей. Т.к. нам нужно, чтобы он отработал 1 раз, то передаём пустой массив

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
      .then(response => response.json())
      .then(todos =>
        setTimeout(() => {
          setTodos(todos);
          setLoading(false)
        }, 2000))
  }, [])

  function toggleToDo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))    //оставляем элементы, которые не совпадают с ИДшками в массиве. Если совпадает - удалится
  }

  function addTodo(title) {
    setTodos([...todos, {
      id: Date.now(),
      title,
      completed: false
    }])
  }

  // Provider нужен для того, чтобы передавать функции\свойства\и т.д. в обход других компонент напрямую

  return (

    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper">
        <h1>React To Do List!</h1>
        <Modal />

        <Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />

        </Suspense>

        {loading && <Preloader />}

        {todos.length ? (<ToDoList
          todos={todos}
          onToggle={toggleToDo}
        />) : (loading ? null : <p> Сейчас нет задач!</p>)
        }
      </div>
    </Context.Provider>
  );
}

export default App;
