import { useState } from 'react';
import { uploadImage, deleteImage } from '../firebase/firebaseStorage';

const EditTodoForm = ({ currentTodo, updateTodo, setIsEditing }) => {
    const [todoName, setTodoName] = useState(currentTodo.todoName);
    const [priority, setPriority] = useState(currentTodo.priority);
    const [image, setImage] = useState(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let newImageURL = currentTodo.imageURL;
        let oldImageURL = null;
    
        if (image) {
          // Upload new image first
          newImageURL = await uploadImage(image);
    
          // Temporarily store old image URL to delete later
          oldImageURL = currentTodo.imageURL;
        }
    
        const updatedTodo = {
          todoName,
          priority: parseInt(priority, 10),
          imageURL: newImageURL,
        };
    
        try {
          await updateTodo(currentTodo.id, updatedTodo);
          // Delete old image only after successful update
          if (oldImageURL) {
            await deleteImage(oldImageURL);
          }
          setIsEditing(false); // Close the edit form
        } catch (error) {
          // Handle any errors, possibly reverting to the old image URL if needed
        }
    }

    return (
        <form onSubmit={handleSubmit}>
          {/* Todo Name Input */}
          <div>
            <label htmlFor="todoName">Todo Name:</label>
            <input
              type="text"
              id="todoName"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              placeholder="Enter todo name"
            />
          </div>
    
          {/* Priority Input */}
          <div>
            <label htmlFor="priority">Priority:</label>
            <input
              type="number"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="Enter priority (e.g. 1, 2, 3)"
            />
          </div>
    
          {/* Image Upload Input */}
          <div>
            <label htmlFor="imageUpload">Upload Image:</label>
            <input
              type="file"
              id="imageUpload"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
    
          {/* Submit Button */}
          <button type="submit">Update Todo</button>
        </form>
      );
  };

export default EditTodoForm;