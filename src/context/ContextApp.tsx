// src/context/ContextApp.tsx
import React, { useState } from 'react';
import { User } from '../interfaces/Models';

export interface AppContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  completed: boolean;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextApp = React.createContext<AppContextProps>({
  user: { id:'', email:'', first_name:'', last_name:'', username:'', role: 'student' },
  setUser: () => {},
  completed: false,
  setCompleted: () => {}
});

export const ContextAppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    role: 'student'
  });
  const [completed, setCompleted] = useState(false);

  return (
    <ContextApp.Provider value={{ user, setUser, completed, setCompleted }}>
      {children}
    </ContextApp.Provider>
  );
};
