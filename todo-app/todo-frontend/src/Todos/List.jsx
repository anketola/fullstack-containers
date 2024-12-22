import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <Todo          
            todo={todo}
            onDelete={deleteTodo}
            onComplete={completeTodo}
          />
          <hr />
        </div>
      ))}
    </div>
  )
}

export default TodoList
