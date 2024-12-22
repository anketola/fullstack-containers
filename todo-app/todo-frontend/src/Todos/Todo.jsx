import React from 'react';

const Todo = ({ todo, onDelete, onComplete }) => {
  const handleDelete = () => {
    onDelete(todo);
  };

  const handleComplete = () => {
    onComplete(todo);
  };

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'space-evenly',
      maxWidth: '70%',
      margin: 'auto'
    }}>

      <span>{todo.text}</span>
      {todo.done ? (
        <div>
          <span>
            This todo is done
          </span>
          <button onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : (
        <div>
          <span>
            This todo is not done
          </span>                    
          <button onClick={handleDelete}>
            Delete
          </button>
          <button onClick={handleComplete}>
            Set as done
          </button>
        </div>
      )}
    </div>
  );
};
export default Todo