import TestMain from "./components/TestMain"
import Detail from "./components/Detail"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Detail />}></Route>
        <Route path="/" element={<TestMain />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
