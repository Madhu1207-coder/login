import { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { HomePage } from './components/HomePage';

interface User {
  email: string;
  password: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const handleSignUp = (email: string, password: string): { success: boolean; message?: string } => {
    // Check if user already exists
    const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      return { success: false, message: 'User already exists! Please login instead.' };
    }

    // Add new user
    const newUser = { email, password };
    setUsers([...users, newUser]);
    return { success: true };
  };

  const handleLogin = (email: string, password: string): { success: boolean; message?: string } => {
    // Find user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, message: 'Invalid credentials! User does not exist.' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Invalid credentials! Incorrect password.' };
    }

    setCurrentUser(user);
    setIsAuthenticated(true);
    return { success: true };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="size-full">
      {isAuthenticated && currentUser ? (
        <HomePage user={currentUser} onLogout={handleLogout} />
      ) : (
        <AuthPage onLogin={handleLogin} onSignUp={handleSignUp} />
      )}
    </div>
  );
}
