import { useState } from 'react';
import { addTodo } from '../firebase/firestore';
import { uploadImage } from '../firebase/firebaseStorage';

const TodoForm = ({ currentUser }) => {
    const [todoName, setName] = useState('');
    const [priority, setPriority] = useState('');
    const [image, setImage] = useState(null); // For file upload

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let imageURL = '';
        if (image) {
          imageURL = await uploadImage(image); // Handle the image upload
        }
    
        const todoData = {
          todoName,
          priority: parseInt(priority, 10),
          imageURL,
          userId: currentUser.uid
        };
    
        await addTodo(todoData);
    
        // Reset form or provide feedback...
        console.log("Todo added successfully");
        setName('');
        setPriority('');
        setImage(null);
      };

    return (
        <form onSubmit={handleSubmit}>
        <input 
            type="text"
            value={todoName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter todo name"
        />
        <input 
            type="number"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="Enter priority"
        />
        <input 
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
