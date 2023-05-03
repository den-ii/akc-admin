import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  function handleUser(val) {
    {
      setUser(val);
    }
  }
  return (
    <UserContext.Provider value={{ user, handleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
