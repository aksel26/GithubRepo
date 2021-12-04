import React, { createContext, useReducer } from "react";
import Main from "./components/Main";
import Detail from "./components/Detail";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initialState, reducer } from "./store/reducer";

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/gitRepo" element={<Login />}></Route>
          <Route path="/:id" element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
