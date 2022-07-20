import React, { useState } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

/* aqui almacenamos los To do */
const TodoList = () => {

  const [todos, setTodos] = useState([]);

  const agregarTodo = (todo) => {
    console.log(todo);
    setTodos ((old) => [...old, todo])
  };

  const eliminarTodo = (id) => {
    setTodos((old) => old.filter((item) => item.id !== id))
  };

  const editarTodo = (id) => {
    const uditTodo= todos.map((item) => 
      item.id === id ? {...item, estado: !item.estado} : item
    )
    setTodos(uditTodo)
  };

  return (
    <>
        <TodoForm agregarTodo = {agregarTodo} />
        <div className='row'>
          <div className='col-sm-4'></div>
          <div className='col-sm-4'>
            <ul className='list-group '>
              {
                /*  recorremos los Todos */
                todos.map((item) =>(
                  <Todo key= {item.id} 
                  todo = {item} 
                  eliminarTodo = {eliminarTodo}
                  editarTodo = {editarTodo}
                  />
                ))
              } 
            </ul>
          </div>
        </div>


    </>
  )
}

export default TodoList