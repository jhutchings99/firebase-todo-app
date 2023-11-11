import { useEffect, useState } from 'react';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList';
import Logout from './components/Logout';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      {currentUser ? (
        <div>
          <Logout />
          Welcome, {currentUser.displayName}
          <TodoForm currentUser={currentUser}/>
          <TodoList currentUser={currentUser}/>
        </div>
        
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
};

export default App;
