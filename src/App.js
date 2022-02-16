import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./App.css";
import Todo from "./component/Todo";
import TodoItem from "./component/Todo/TodoItem";
import { todoListState } from "./recoil";

function App() {
  const todoList = useRecoilValue(todoListState);
  return (
    <>
      <Routes>
        <Route element={<Todo />} path={"/"} />
        {todoList.map((todo) => {
          return (
            <Route
              path={todo.id}
              element={<TodoItem todo={todo} />}
              key={todo.id}
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
