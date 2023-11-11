import { signInWithGoogle } from '../firebase/firebaseAuth';

const Login = () => {
  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
