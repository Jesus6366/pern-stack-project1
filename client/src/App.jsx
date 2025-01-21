import {BrowserRouter, Routes, Route} from "react-router-dom"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"


const App = () =>{
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<TaskList/>} />
    <Route path="/tasks/new" element={<TaskForm/>} />
  

  </Routes>
  
  </BrowserRouter>
}

export default App