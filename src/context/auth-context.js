import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {}
});

const AuthContextProvider = props => {
  let [authenticated, setAuthenticatd] = useState(false);

  const loginhandler = () => {
    setAuthenticatd(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth: authenticated,
        login: loginhandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
