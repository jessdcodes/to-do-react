import Todo from "./components/Todo";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <h2>What needs to be done?</h2>
      <Todo />
    </div>
  );
}