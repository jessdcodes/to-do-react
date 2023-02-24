import Todo from "./components/Todo";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h3 id="todo-title">To-Do List</h3>
      <p id="todo-desc">What needs to be done?</p>
      <Todo />
    </div>
  );
}