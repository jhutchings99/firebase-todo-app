import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, updateTodo } from '../firebase/firestore';
import EditTodoForm from './EditTodoForm';

const TodoList = ({ currentUser }) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const handleDelete = async (todo) => {
    await deleteTodo(todo.id, todo.imageURL);
    setTodos(todos.filter(item => item.id !== todo.id)); // Update state
  };

    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null); // The todo being edited

    const handleEditClick = (todo) => {
        setIsEditing(!isEditing);
        setCurrentTodo(todo);
    };

  console.log(todos)

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
            <h3>{todo.todoName}</h3>
            <p>Priority: {todo.priority}</p>
            <p>Created by: {todo.userId}</p>
            {todo.imageURL && <img src={todo.imageURL} alt={todo.todoName} />}
            { currentUser.uid === todo.userId && (
                <>
                    <button onClick={() => handleDelete(todo)}>Delete</button>
                    <button onClick={() => handleEditClick(todo)}>Edit</button>
                </>
            )}
        </div>
      ))}
    {isEditing && (
    <EditTodoForm 
        currentTodo={currentTodo} 
        updateTodo={updateTodo}
        setIsEditing={setIsEditing}
    />
    )}
    </div>
  );
};

export default TodoList;
