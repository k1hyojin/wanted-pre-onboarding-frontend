import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./routes/Home";
import Todo from "./routes/Todo";
import Join from "./routes/Join";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path={"/todo" }element={<Todo />}/>
          <Route path={"/join"} element={<Join />}/>
          <Route path={`/`} element={<Home />} />
      </Routes>
  </Router>
  )
}

export default App;
