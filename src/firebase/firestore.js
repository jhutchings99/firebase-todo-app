import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query } from "firebase/firestore";
import { getStorage, ref, deleteObject} from "firebase/storage";

const todoCollectionRef = collection(db, "todos");

// Create a new todo item
export const addTodo = async (todo) => {
  return await addDoc(todoCollectionRef, todo);
};

// Get all todo items for a user
export const getUserTodos = async (userId) => {
  const querySnapshot = await getDocs(todoCollectionRef);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })).filter(todo => todo.userId === userId);
};

// Get all todos
export const getTodos = async () => {
  const todosCollectionRef = collection(db, "todos");
  const q = query(todosCollectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Update a todo item
export const updateTodo = async (id, updatedTodo) => {
  const todoDoc = doc(db, "todos", id);
  return await updateDoc(todoDoc, updatedTodo);
};

// Delete a todo item
export const deleteTodo = async (id, imageUrl) => {
    // Delete the todo document
    const todoDocRef = doc(db, "todos", id);
    await deleteDoc(todoDocRef);
  
    if (imageUrl) {
      // Delete the image from Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
};

